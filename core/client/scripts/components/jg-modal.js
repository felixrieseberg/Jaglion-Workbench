Jaglion.JgModalComponent = Ember.Component.extend({
    classNames: ['primary'],

    actions: {
        close: function() {
            this.$('.modal').modal('hide');
            return this.sendAction();
        },

    },

    show: function() {
        this.$('.modal').modal('show').on('hidden.bs.modal', function() {
            this.sendAction();
        }.bind(this));
    }.on('didInsertElement')

});