Jaglion.XmlextractionController = Ember.Controller.extend({

    sourceFile: '',
    datasetName: '',
    resultName: '',
    numberColums: 0,
    jobsReceived: false,
    jobNames: [],
    jobNameOptions: [],
    jobNamesSelected: false,
    selectedJobNameOptions: [],
    scannerNodes: [],
    xmlConfig: {},
    xmlConfigString: {},
    configCreated: false,

    actions: {
        getJobNames: function() {
            var self = this,
                notFoundMessage = 'The selected input file doesn\'t exist on the server or can\'t be opened. Please check that the path to the file is correct.',
                failMessage = 'Something went wrong and the selected file could not be processed.';

            $.post('/api/xmldissect', { 'sourceFile': this.get('sourceFile') }, function (result) {
                if (result.error && result.error.message) {
                    console.log('Dissecting the file failed: ');
                    console.log(result.error);

                    if (result.error.message.indexOf('ENOENT') > -1) {
                        return self.send('showModal', 'execerror-modal', { message: notFoundMessage });
                    } else {
                        return self.send('showModal', 'execerror-modal', { message: failMessage });
                    }
                };

                if (result.jobNames) {
                    result.jobNameOptions = [];

                    for (var i = 0; i < result.jobNames.length; i++) {
                        result.jobNameOptions.push({ 
                            value: result.jobNames[i],
                            label: result.jobNames[i]
                        });
                    };

                    console.log('Success! Job Names: ');
                    console.log(result.jobNames);

                    self.set('jobNames', result.jobNames);
                    self.set('jobNameOptions', result.jobNameOptions);
                    self.set('jobsReceived', true);
                    self.send('showJobNames');
                } else {
                    return self.send('showModal', 'execerror-modal', { message: failMessage });
                };
            }).fail(function () {
                self.send('showModal', 'execerror-modal', { message: failMessage });
            })
        },

        confirmJobNameSelection: function () {
            var selectedJobNameOptions = this.get('selectedJobNameOptions'),
                selectedJobNames = [];

            for (var i = selectedJobNameOptions.length - 1; i >= 0; i--) {
                selectedJobNames.pushObject({
                    name: selectedJobNameOptions[i],
                    scannerToken: selectedJobNameOptions[i],
                    hasAttributes: false,
                    getChildren: false,
                    extractOnStartTagOnly: false,
                    extractor: 0,
                    column: 0,
                    xpath: '//' + selectedJobNameOptions[i] + '/',
                    extras: []
                });
            };

            this.set('scannerNodes', selectedJobNames);
            this.set('jobNamesSelected', true);
        },

        createConfig: function () {
            var xmlResult = '<?xml version="1.0"?>\n<?xml-stylesheet type = "text/xsl" href="configuration.xsl"?>\n<configuration></configuration>',
                scannerNodes = this.get('scannerNodes'),
                parser = new DOMParser(),
                xmlSerializer = new XMLSerializer(),
                configuration, parsingNodes;

            xmlResult = parser.parseFromString(xmlResult, 'text/xml');
            configuration = xmlResult.getElementsByTagName('configuration')[0];
            
            function createProperty(name, value) {
                var childNode = xmlResult.createElement('property'),
                    nameNode = xmlResult.createElement('name'),
                    valueNode = xmlResult.createElement('value');

                nameNode.appendChild(xmlResult.createTextNode(name));
                valueNode.appendChild(xmlResult.createTextNode(value));
                childNode.appendChild(nameNode);
                childNode.appendChild(valueNode);

                return childNode;
            }
            
            // <value>sgFunktion;true;true;IS_LESEN_DETAIL;5#//sgFunktion/datensatz#2;</value>
            // scannerToken;hasAttributes;getChildren;startTagOnly;indexOfColumn;xpath;extractorId
            for (var i = scannerNodes.length - 1; i >= 0; i--) {
                var valueString = "";

                valueString += scannerNodes[i].scannerToken + ';';
                valueString += (scannerNodes[i].hasAttributes) ? 'true;' : 'false;';
                valueString += (scannerNodes[i].getChildren) ? 'true;' : 'false;';
                valueString += (scannerNodes[i].extractOnStartTagOnly) ? scannerNodes[i] + ';' : ' ;';
                valueString += scannerNodes[i].column + '#';
                valueString += scannerNodes[i].xpath + '#';
                valueString += scannerNodes[i].extractor + ';';

                for (var eI = scannerNodes[i].extras.length - 1; eI >= 0; i--) {
                    valueString += scannerNodes[i].extras[eI].column + '#';
                    valueString += scannerNodes[i].extras[eI].xpath + '#';
                    valueString += scannerNodes[i].extras[eI].extractor + ';';
                };

                parsingNodes += scannerNodes[i].name + ';'
                configuration.appendChild(createProperty(scannerNodes[i].name, valueString));
            };

            configuration.appendChild(createProperty('xmlparser.delimiter_string', ';'));
            configuration.appendChild(createProperty('xmlparser.sort_order_delimiter_string', '#'));
            configuration.appendChild(createProperty('xmlparser.parsing_nodes', parsingNodes));
            configuration.appendChild(createProperty('xmlparser.nr_of_columns', this.get('numberColums')));
            configuration.appendChild(createProperty('xmlparser.dataset_name', this.get('datasetName')));
            configuration.appendChild(createProperty('xmlparser.result_name', this.get('resultName')));

            console.log(xmlSerializer.serializeToString(xmlResult));
            this.set('xmlConfig', xmlResult);
            this.set('xmlConfigString', xmlSerializer.serializeToString(xmlResult));
            this.set('configCreated', true);
        },

        addScannerNode: function () {
            var scannerNodes = this.get('scannerNodes');

            scannerNodes.pushObject({
                name: '',
                scannerToken: '',
                hasAttributes: false,
                getChildren: false,
                extractOnStartTagOnly: false,
                extractor: 0,
                column: 0,
                xpath: '//',
                extras: []
            });

            this.set('scannerNodes', scannerNodes);
        },

        addAttributeScanner: function (job) {
            job.extras.pushObject({
                column: job.column,
                xpath: job.xpath,
                extractor: job.extractor
            });
        },

        selectOutput: function () {
            $('textarea').select()
        }
    }

});