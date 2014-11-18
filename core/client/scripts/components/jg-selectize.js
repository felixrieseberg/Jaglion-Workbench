Jaglion.JgSelectizeComponent = Ember.Component.extend({
    didInsertElement: function() {
        this.$('select').selectize({
            plugins: ['remove_button'],
            options: this.get('options'),
            labelField: 'label',
            valueField: 'value',
            searchField: 'label',

            onChange: function(value) {
                console.log(value);
                this.set('selection', value);
            }.bind(this)
        });
        this.selectize = this.$('select')[0].selectize;
    },
    
    willDestroyElement: function() {
        this.selectize.destroy();
    }
});