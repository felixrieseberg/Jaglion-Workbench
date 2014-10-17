var config          = require('../config'),
    debug           = require('debug')('jaglion-azure'),
    Promise         = require('bluebird'),
    fs              = require('fs'),
    scriptRunner    = require('./scriptRunner');

azure = {

    setup: function() {
        var oldContent, newContent;

        return new Promise(function (resolve, reject) {
            var oldContent = fs.readFileSync('./bin/s1-azure-setup.sh', 'utf8');

            if (!config.clusterName || !config.clusterNodes || !config.clusterLocation || 
                !config.clusterUsername || !config.clusterPassword || !config.storageAccountContainer ||
                !config.storageAccountName || !config.storageAccountKey) {
                reject({error: 'The configuration is incomplete or invalid. Please provide all required configuration parameters!', config: config });
            }

            debug('Old Content', oldContent);
            newContent = oldContent.replace('%clusterName%', config.clusterName);
            newContent = newContent.replace('%clusterNodes%', config.clusterNodes);
            newContent = newContent.replace('%clusterLocation%', config.clusterLocation);
            newContent = newContent.replace('%storageAccountName%', config.storageAccountName);
            newContent = newContent.replace('%storageAccountKey%', config.storageAccountKey);
            newContent = newContent.replace('%storageContainer%', config.storageAccountContainer);
            newContent = newContent.replace('%clusterUsername', config.clusterUsername);
            newContent = newContent.replace('%clusterPassword', config.clusterPassword);
            
            debug('New Content', newContent);

            scriptRunner.save('./bin/s1-azure-setup-exec.sh', newContent)
            .then(function () {
                scriptRunner.run('./bin/s1-azure-setup-exec.sh').then(function (output) {
                    debug(output);
                    resolve(output);
                }).catch(function (error) {
                    reject(error);
                    debug(error);
                })
            })
        });
    }

}

module.exports = azure;