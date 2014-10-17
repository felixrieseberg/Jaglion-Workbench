Jaglion.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('config');
    }
});