Jaglion.XmlextractionRoute = Ember.Route.extend({
    actions: {
        showJobNames: function(options) {
            return this.render('jobnames-select', {
                into: 'xmlextraction',
                outlet: 'jobnames',
                controller: this.controllerFor('xmlextraction')
            });
        },
    }
});

