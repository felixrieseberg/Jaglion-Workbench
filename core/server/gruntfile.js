module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['./api/*.js'],
            options: {
                jshintrc: true
            }
        },

        concurrent: {
            dev: {
                tasks: ['nodemon'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        watch: {
            all: {
                files: ['./api/*.js']
            }
        },

        nodemon: {
            dev: {
                script: 'app.js'
            }
        },

        nodewebkit: {
            win: {
                options: {
                    name: 'Jaglion Workbench',
                    platforms: ['win'],
                    buildDir: '../../builds'
                },
                src: ['./api/**/*', './bin/**/*', './clientdist/**/*', './node_modules/**/*', '*.js', '*.html', '*.json', '!./node_modules/grunt**/**'] // Your node-webkit app
            },
            unix: {
                options: {
                    name: 'Jaglion Workbench',
                    platforms: ['osx', 'linux32'],
                    buildDir: '../../builds'
                },
                src: ['./api/**/*', './bin/**/*', './clientdist/**/*', './node_modules/**/*', '*.js', '*.html', '*.json', '!./node_modules/grunt**/**'] // Your node-webkit app
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('buildwin', ['nodewebkit:win']);
    grunt.registerTask('buildunix', ['nodewebkit:unix']);
    grunt.registerTask('dev', ['concurrent']);
    grunt.registerTask('default', ['jshint']);
};
