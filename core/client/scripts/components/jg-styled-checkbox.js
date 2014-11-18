Jaglion.JgStyledCheckboxComponent = Ember.Checkbox.extend({
    applyStyle: function() {
        $(':checkbox').radiocheck();
    }.on('didInsertElement')
});