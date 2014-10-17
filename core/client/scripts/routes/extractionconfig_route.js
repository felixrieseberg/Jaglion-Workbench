Jaglion.ExtractionConfigRoute = Ember.Route.extend({
    model: function(params) {
        //return this.get('store').find('index', params.index_id);
    },

    renderTemplate: function() {
        this.render('extractionconfig', { outlet: 'main' });
    }
});

