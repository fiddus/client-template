'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var timer = require('grunt-timer'),
        configs = {
            app: '.',
            appCwd: './',
            buildPath: grunt.option('path') || './build'
        };

    timer.init(grunt, {friendlyTime: false, color: 'blue'});

    grunt.initConfig({

        /************************************************************************
         * General Configurations
         ************************************************************************/

        config: configs,


        // Enviroment variables configurations
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },


        // Hint JavaScript errors
        jshint: {
            options: {
                jshintrc: true,
                reporter: require('jshint-stylish'),
                ignores: [
                    'bower_components/**/*',
                    'assets/**/*',
                    'node_modules/**/*',
                    'build/**/*'
                ]
            },
            all: ['./**/*.js']
        },


        // Hint JavaScript code styles
        jscs: {
            options: {
                config: '.jscsrc',
                reporter: require('jscs-stylish').path,
                excludeFiles: [
                    'bower_components/**/*',
                    'assets/**/*',
                    'node_modules/**/*',
                    'build/**/*'
                ]
            },
            all: [
                'client/**/*.js',
                'Gruntfile.js'
            ]
        },


        release: {
            options: {
                npm: false,
                indentation: '    ',
                github: {
                    repo: 'fiddus/case4you-client',
                    usernameVar: 'GITHUB_USERNAME',
                    passwordVar: 'GITHUB_ACCESS_TOKEN'
                }
            }
        },


        /************************************************************************
         * Client Configurations
         ************************************************************************/

        // Client tests
        karma: {
            unit: {
                options: {
                    files: ['./app/**/*Tests.js']
                },
                configFile: './karma.conf.js',
                autoWatch: false,
                singleRun: true
            }
        },


        // TODO: fix this to add boostrap authomatically
        // Automatically inject Bower components
        wiredep: {
            all: {
                src: ['./index.html']
            }
        },


        // Compile Stylus files into CSS files
        sass: {
            build: {
                options: {
                    style: 'expanded',
                    trace: true,
                    unixNewlines: true,
                    lineNumbers: true,
                    cacheLocation: '.tmp/sass-cache'
                },
                files: {
                    '<%= config.buildPath %>/css/main.css': '<%= config.app %>/app/app.scss'
                }
            }
        },


        // Copy files to a desired location
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.appCwd %>/',
                        src: ['index.html'],
                        dest: '<%= config.buildPath %>/',
                        flatten: true,
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.appCwd %>/',
                        src: ['app/**/*'],
                        dest: '<%= config.buildPath %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.appCwd %>/',
                        src: ['bower_components/**/*'],
                        dest: '<%= config.buildPath %>/'
                    }
                ]
            }
        },


        // Remove desired directories
        clean: {
            build: {
                src: ['<%= config.buildPath %>']
            }
        },


        // Connect application
        connect: {
            all: {
                options: {
                    port: 8000,
                    livereload: true,
                    hostname: 'localhost'
                }
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= config.buildPath %>/'
                    ]
                }
            }
        },


        // Watch and live reload code
        watch: {
            options: {
                livereload: true,
                dateFormat: function (time) {
                    grunt.log.writeln('File changed changed in ' + time + ' ms at ' + (new Date()).toString());
                    grunt.log.writeln('Waiting for more changes...');
                }
            },
            gruntfile: {
                files: [
                    './Gruntfile.js'
                ],
                tasks: ['jshint', 'jscs']
            },
            html: {
                files: [
                    '<%= config.app %>/app/**/*.html',
                    '<%= config.app %>/index.html'
                ],
                tasks: ['copy:build']
            },
            sass: {
                files: [
                    '<%= config.app %>/app/**/*.scss',
                    '<%= config.app %>/app/app.scss'
                ],
                tasks: ['sass:build', 'copy:build']
            },
            js: {
                files: [
                    '<%= config.app %>/app/**/*.js'
                ],
                tasks: ['jshint', 'jscs', 'copy:build']
            }
        }
    });


    grunt.registerTask('check', [
        'jshint',
        'jscs'
    ]);


    grunt.registerTask('test-client', [
        'env:test',
        'karma'
    ]);


    grunt.registerTask('build', [
        'clean:build',
        'sass:build',
        'wiredep:all',
        'copy:build'
    ]);


    grunt.registerTask('serve', [
        // 'express',
        'build',
        'connect:livereload',
        'watch'
    ]);


    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` next time.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });
};
