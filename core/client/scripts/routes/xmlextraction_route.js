Jaglion.XmlextractionRoute = Ember.Route.extend({
    actions: {
        showJobNames: function(options) {
            this.controllerFor('jobnames-select').set('options', options);
            return this.render('jobnames-select', {
                into: 'xmlextraction',
                outlet: 'jobnames' 
            });
        },
    }
});

