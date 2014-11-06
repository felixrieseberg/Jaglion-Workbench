Jaglion.ApplicationRoute = Ember.Route.extend({
    actions: {
        showModal: function(name, content) {
            this.controllerFor(name).set('content', content);
            return this.render(name, {
                into: 'application',
                outlet: 'modal'
            });
        },
        removeModal: function() {
            return this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        }
    }
});
