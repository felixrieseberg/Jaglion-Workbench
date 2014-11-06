Jaglion.XmlextractionController = Ember.Controller.extend({

    sourceFile: '',
    jobNames: [],

    actions: {
        getJobNames: function() {
            var self = this,
                notFoundMessage = 'The selected input file doesn\'t exist on the server or can\'t be opened. Please check that the path to the file is correct.',
                failMessage = 'Something went wrong and the selected file could not be processed.',
                jobNameOptions = [];

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
                    for (var i = 0; i < result.jobNames.length; i++) {
                        jobNameOptions.push({ value: result.jobNames[i], label: result.jobNames[i] });
                    };

                    console.log('Success! Job Names: ');
                    console.log(result.jobNames);

                    self.set('jobNames', result.jobNames);
                    self.send('showJobNames', jobNameOptions);
                } else {
                    return self.send('showModal', 'execerror-modal', { message: failMessage });
                };
            }).fail(function () {
                self.send('showModal', 'execerror-modal', { message: failMessage });
            })
        }
    }

});

