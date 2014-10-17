Jaglion.AnonymizeConfigRoute = Ember.Route.extend({
    model: function(params) {
        //return this.get('store').find('index', params.index_id);
    },

    renderTemplate: function() {
        this.render('anonymizeconfig', { outlet: 'main' });
    }
});

