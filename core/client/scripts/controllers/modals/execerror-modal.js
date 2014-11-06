Jaglion.ExecerrorModalController = Ember.Controller.extend({
    actions: {
        close: function() {
            return this.send('removeModal');
        }
    }
});

