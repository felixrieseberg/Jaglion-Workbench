var debug           = require('debug')('jg-scriptrunner'),
    Promise         = require('bluebird'),
    exec            = require('child_process').exec,
    fs              = require('fs');

scriptRunner = {

    run: function (script) {
        return new Promise(function (resolve, reject) {
            var output,
            child = exec(script,
            function (error, stdout, stderr) {
                output = stdout;

                debug('stdout: ' + stdout);
                debug('stderr: ' + stderr);

                if (error !== null) {
                    debug('exec error: ' + error);
                    reject({ error: error, stderr: stderr });
                }

                resolve(output);
            });
        });
    },

    save: function (location, scriptstring) {
        return new Promise(function (resolve, reject) {
            fs.writeFile(location, scriptstring, {
                mode: 0777,
                encoding: 'utf8',
            }, function (error) {
                if (error) {
                    debug(error)
                    reject(error);
                }
                debug('Script ' + location + ' saved.');
                resolve();
            });
        });
    }

}

module.exports = scriptRunner;