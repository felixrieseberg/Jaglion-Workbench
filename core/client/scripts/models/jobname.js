var attr = DS.attr;

Jaglion.JobName = DS.Model.extend({

    value: attr('string'),
    label: attr('string'),
    scannerToken: attr('string'),
    hasAttributes: attr('boolean'),
    getChildren: attr('boolean'),
    extractOnStartTagOnly: attr('boolean'),
    xpath: attr('string'),
    extractor: attr('number'),
    selected: attr('boolean')
    
});