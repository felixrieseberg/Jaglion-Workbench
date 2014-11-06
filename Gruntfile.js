'use strict';

var LIVERELOAD_PORT = 35729,
    lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            emberTemplates: {
                files: 'core/client/templates/**/*.hbs',
                tasks: ['emberTemplates']
            },
            compass: {
                files: ['core/client/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server']
            },
            neuter: {
                files: ['core/client/scripts/{,*/}*.js'],
                tasks: ['neuter']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'core/.tmp/scripts/*.js',
                    'core/client/*.html',
                    'core/{.tmp,client}/styles/{,*/}*.css',
                    'core/client/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 3000,
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, 'core/.tmp'),
                            mountFolder(connect, 'core/client')
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'core/client/test'),
                            mountFolder(connect, 'core/client/.tmp')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'core/server/clientdist')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'core/.tmp',
                        'core/server/clientdist/*',
                        '!core/server/clientdist/.git*'
                    ]
                }]
            },
            server: 'core/.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'core/client/scripts/{,*/}*.js',
                '!core/client/scripts/vendor/*',
                'core/test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        compass: {
            options: {
                sassDir: 'core/client/styles',
                cssDir: 'core/.tmp/styles',
                generatedImagesDir: 'core/.tmp/images/generated',
                imagesDir: 'core/client/images',
                javascriptsDir: 'core/client/scripts',
                fontsDir: 'core/client/styles/fonts',
                importPath: 'core/client/bower_components',
                httpImagesPath: '/core/client/images',
                httpGeneratedImagesPath: '/core/client/images/generated',
                httpFontsPath: '/core/client/styles/fonts',
                relativeAssets: false
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        'core/server/clientdist/scripts/{,*/}*.js',
                        'core/server/clientdist/styles/{,*/}*.css',
                        'core/server/clientdist/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        'core/server/clientdist/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: 'core/.tmp/index.html',
            options: {
                dest: 'core/server/clientdist'
            }
        },
        usemin: {
            html: ['core/server/clientdist/{,*/}*.html'],
            css: ['core/server/clientdist/styles/{,*/}*.css'],
            options: {
                dirs: ['core/server/clientdist']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'core/client/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: 'core/server/clientdist/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'core/client/images',
                    src: '{,*/}*.svg',
                    dest: 'core/server/clientdist/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    'core/server/clientdist/styles/main.css': [
                        'core/.tmp/styles/{,*/}*.css',
                        'core/client/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'core/client',
                    src: '*.html',
                    dest: 'core/server/clientdist'
                }]
            }
        },
        replace: {
          app: {
            options: {
              variables: {
                ember: 'bower_components/ember/ember.js',
                ember_data: 'bower_components/ember-data/ember-data.js'
              }
            },
            files: [
              {src: 'core/client/index.html', dest: 'core/.tmp/index.html'}
            ]
          },
          dist: {
            options: {
              variables: {
                ember: 'bower_components/ember/ember.prod.js',
                ember_data: 'bower_components/ember-data/ember-data.prod.js'
              }
            },
            files: [
              {src: 'core/client/index.html', dest: 'core/.tmp/index.html'}
            ]
          }
        },
        // Put files not handled in other tasks here
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        cwd: 'core/client/bower_components/',
                        dest: 'core/client/styles/fonts/',
                        src: [
                            'bootstrap-sass-official/vendor/assets/fonts/bootstrap/**'
                        ]
                    }
                ]
            }, 
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'core/client',
                        dest: 'core/server/clientdist',
                        src: [
                            '*.{ico,txt}',
                            '.htaccess',
                            'images/{,*/}*.{webp,gif}',
                            'styles/fonts/*'
                        ]
                    }
                ]
            }
        },
        concurrent: {
            server: [
                'emberTemplates',
                'compass:server'
            ],
            test: [
                'emberTemplates',
                'compass'
            ],
            dist: [
                'emberTemplates',
                'compass:dist',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        emberTemplates: {
            options: {
                templateName: function (sourceFile) {
                    var templatePath = 'core/client' + '/templates/';
                    return sourceFile.replace(templatePath, '');
                }
            },
            dist: {
                files: {
                    'core/.tmp/scripts/compiled-templates.js': 'core/client/templates/**/*.hbs'
                }
            }
        },
        neuter: {
            app: {
                options: {
                    filepathTransform: function (filepath) {
                        return 'core/client' + '/' + filepath;
                    }
                },
                src: 'core/client/scripts/app.js',
                dest: 'core/.tmp/scripts/combined-scripts.js'
            }
        },
        nodewebkit: {
            win: {
                options: {
                    name: 'Jaglion',
                    platforms: ['win'],
                    buildDir: './builds',
                    winIco: './core/shared/images/icon.ico'
                },
                src: ['core/**/*', '!core/client/', '!node_modules/grunt**/**', 'updater/**/*', 'updater_client/**/*', 'views/**/*', '*.js', '*.html', '*.json'] // Your node-webkit app
            },
            unix: {
                options: {
                    name: 'Jaglion',
                    platforms: ['osx', 'linux32'],
                    buildDir: './builds',
                    macIcns: './public/images/icon.icns',
                    winIco: './public/images/icon.ico'
                },
                src: ['public/**/*', 'node_modules/**/*', '!node_modules/grunt**/**', 'updater/**/*', 'updater_client/**/*', 'views/**/*', '*.js', '*.html', '*.json'] // Your node-webkit app
            }
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'replace:app',
            'concurrent:server',
            'neuter:app',
            'copy:fonts',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'replace:app',
        'jshint',
        'concurrent:test',
        'connect:test',
        'neuter:app'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'replace:dist',
        'useminPrepare',
        'concurrent:dist',
        'neuter:app',
        'concat',
        'cssmin',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
