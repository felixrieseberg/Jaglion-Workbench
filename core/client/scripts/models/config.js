var attr = DS.attr;

Jaglion.Config = DS.Model.extend({

    // Folder Configuration
    outputDirectory: DS.attr('string'),
    inputDirectory: DS.attr('string'),

    // Azure Configuration
    clusterName: DS.attr('string'),
    clusterLocation: DS.attr('string'),
    clusterUsername: DS.attr('string'),
    clusterPassword: DS.attr('string'),
    clusterNodes: DS.attr('number'),
    storageAccountName: DS.attr('string'),
    storageAccountKey: DS.attr('string'),
    storageAccountContainer: DS.attr('string')

});