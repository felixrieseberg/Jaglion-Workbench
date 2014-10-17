Jaglion.AzureConfigRoute = Ember.Route.extend({

    model: function(params) {
        return this.get('store').find('config');
    },

    renderTemplate: function() {
        this.render('config', { outlet: 'main' });
    }
});

