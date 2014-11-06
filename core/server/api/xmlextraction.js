var config          = require('../config'),
    debug           = require('debug')('jg-xmlextract'),
    Promise         = require('bluebird'),
    xml2js          = require('xml2js'),
    parser          = new xml2js.Parser(),
    fs              = Promise.promisifyAll(require('fs')),
    _               = require('underscore'),

    scriptRunner    = require('./scriptRunner');

function getJobNames (input) {
    var regex = /jobName="(\S*)"/g, 
        match, result = [];

    while (match = regex.exec(input)) {
        result.push(match[1]);
    }
    result = _.uniq(result);

    debug('Found Job Names', result);
    return result;
};

function getAttributes (input) {
    var rootNode, attributes, header, car, metaData;

    return new Promise(function (resolve, reject) {
        parser.parseString(input, function (error, result) {
            if (error) {
                return reject(error);
            }

            debug(result);

            for (rootNode in result) break;
            result = result[rootNode];

            if (result && result.$ && result.header && result.fzgIdent) {
                attributes = result.$;
                header = result.header;
                car = result.fzgIdent;

                metaData = {
                    attributes: attributes,
                    header: header,
                    car: car
                }

                return resolve(metaData);
            }
            return reject("There was an error parsing the input XML.");
        });
    });
};

xmlextraction = {

    dissectSourceFile: function (path) {
        var jobNames, dissectedSource;

        return new Promise(function (resolve, reject) {
            debug('Dissecting source file at ' + path);

            fs.readFileAsync(path, { encoding: 'utf8' })
            .then(function (result) {
                debug('File read successfully');
                
                jobNames = getJobNames(result);

                getAttributes(result)
                .then(function (metaData) {
                    dissectedSource = {
                        metaData: metaData,
                        jobNames: jobNames
                    }
                    return resolve(dissectedSource);
                })
            }).catch(function (error) {
                debug('Error reading source XML file', error);
                return reject(error);
            });
        });
    },

    createConfig: function (inputString) {
        return new Promise(function (resolve, reject) {
            fs.writeFile('./bin/xmlextraction.xml', inputString, function (err) {
                if (error) {
                    debug(error);
                    reject(error);
                }
                resolve();
            });
        });
    }

}

module.exports = xmlextraction;