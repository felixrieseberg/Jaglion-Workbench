var express         = require('express'),
    config          = require('../config'),
    debug           = require('debug')('jaglion-api'),
    Promise         = require('bluebird'),
    router          = express.Router(),

    scriptRunner    = require('./scriptRunner'),
    azure           = require('./azure');

router.get('/config', function (req, res) {
    debug('Getting Config');

    res.json({config: config});
});

router.post('/config', function (req, res) {
    debug('Posting Config', req.body);

    for (var configSetting in req.body.config) {
        if (req.body.config.hasOwnProperty(configSetting) && req.body.config[configSetting]) {
            config[configSetting] = req.body.config[configSetting];
        }
    }

    res.json({ config: config });
});

router.post('/azureconfig', function (req, res) {
    azure.setup(req).then(function (result) {
        res.json(result);
    }).catch(function (error, stderr) {
        res.json(error);
    })
});

router.post('/exectest', function (req, res) {
    scriptRunner.run('./bin/test.sh').then(function (result) {
        res.json(result);
    })
});

module.exports = router;