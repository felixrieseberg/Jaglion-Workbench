Jaglion.ConfigController = Ember.Controller.extend({

    actions: {
        setConfig: function () {
            var inputDirectory = this.get('inputDirectory'),
                outputDirectory = this.get('outputDirectory'), 
                clusterName = this.get('clusterName'),
                clusterLocation = this.get('clusterLocation'),
                clusterUsername = this.get('clusterUsername'),
                clusterPassword = this.get('clusterPassword'),
                clusterNodes = this.get('clusterNodes'),
                storageAccountName = this.get('storageAccountName'),
                storageAccountKey = this.get('storageAccountKey'),
                storageAccountContainer = this.get('storageAccountContainer'),
                self = this;

            var config = this.store.createRecord('config', {
                clusterName: clusterName,
                clusterLocation: clusterLocation,
                clusterUsername: clusterUsername,
                clusterPassword: clusterPassword,
                clusterNodes: clusterNodes,
                storageAccountName: storageAccountName,
                storageAccountKey: storageAccountKey,
                storageAccountContainer: storageAccountContainer
            });

    
            config.save().then(function (record) {
                $.post('/api/azureconfig', function (result) {
                    console.log(result);

                    var message; 

                    if (result) {
                        if (result.stderr && result.stderr.indexOf('azure: command not found' > -1)) {
                            message = 'It appears that the Azure command line tools are not installed.';
                            message += 'The script returned: \n\n';
                            message += result.stderr;
                        } else if (result.stderr) {
                            message = 'The Azure configuration was not successful.';
                            message += 'The script returned: \n\n';
                            message += result.stderr;
                        } else if (result.error) {
                            message = 'The Azure configuration was not successful.';
                            message += result.error;
                        }

                        self.send('showModal', 'execerror-modal', { message: message});
                    }
                });
            });
        },

        selectDirectory: function (dir) {
            $(dir).trigger('click'); 
        },

        updateLocation: function () {
            this.set('clusterLocation', $('#clusterLocation option:selected').text());
        },

        updateDirectory: function (dir) {
            switch (dir) {
                case 'inputdir':
                    $('#inputdir-display').val($('#inputdir').val());
                    this.set('inputDirectory', $('#inputdir').val());
                    break;
                case 'outputdir':
                    $('#outputdir-display').val($('#outputdir').val());
                    this.set('outputDirectory', $('#outputdir').val());
                    break;
                default:
                    break;
            }
        }
    }

});

