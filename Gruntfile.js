'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var timer = require('grunt-timer'),
        configs = {
            app: '.',
            tempPath: '.tmp',
            distPath: './dist',
            buildPath: grunt.option('path') || './build',
            productionPath: grunt.option('path') || '/var/www/fiddus/client'
        };

    timer.init(grunt, {
        friendlyTime: false,
        color: 'blue'
    });

    grunt.initConfig({

        /************************************************************************
         * General Configurations
         ************************************************************************/

        config: configs,


        // Enviroment variables configurations
        env: {
            test: {
                NODE_ENV: 'test'
            },
            prod: {
                NODE_ENV: 'prod'
            }
        },


        // Hint JavaScript errors
        jshint: {
            options: {
                jshintrc: true,
                reporter: require('jshint-stylish'),
                ignores: [
                    'bower_components/**/*',
                    'node_modules/**/*',
                    'build/**/*',
                    'dist/**/*'
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
                    'node_modules/**/*',
                    'build/**/*',
                    'dist/**/*'
                ]
            },
            all: [
                'client/**/*.js',
                'Gruntfile.js'
            ]
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
                    cacheLocation: '<%= config.tempPath %>/sass-cache'
                },
                files: {
                    '<%= config.buildPath %>/css/main.css': '<%= config.app %>/assets/scss/appDev.scss'
                }
            },
            prod: {
                options: {
                    style: 'compressed',
                    unixNewlines: true,
                    cacheLocation: '<%= config.tempPath %>/sass-cache'
                },
                files: {
                    '<%= config.app %>/css/main.css': '<%= config.app %>/assets/scss/appProd.scss'
                }
            }
        },


        // Remove desired directories
        clean: {
            build: {
                src: [
                    '<%= config.tempPath %>',
                    '<%= config.distPath %>',
                    '<%= config.buildPath %>'
                ]
            },
            prod: {
                options: {
                    force: true
                },
                src: [
                    '<%= config.tempPath %>',
                    '<%= config.distPath %>',
                    '<%= config.buildPath %>',
                    '<%= config.productionPath %>'
                ]
            },
            after: {
                src: [
                    '<%= config.app %>/js',
                    '<%= config.app %>/css',
                    '<%= config.tempPath %>',
                    '<%= config.distPath %>'
                ]
            }
        },


        // Copy files to a desired location
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/',
                        src: ['index.html'],
                        dest: '<%= config.buildPath %>/',
                        flatten: true,
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/',
                        src: ['app/**'],
                        dest: '<%= config.buildPath %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/',
                        src: ['assets/images/**'],
                        dest: '<%= config.buildPath %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/',
                        src: ['bower_components/**'],
                        dest: '<%= config.buildPath %>/'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/',
                        src: ['index.html'],
                        dest: '<%= config.distPath %>/',
                        flatten: true,
                        filter: 'isFile'
                    }
                ]
            },
            prod: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.distPath %>/',
                        src: ['index.html'],
                        dest: '<%= config.productionPath %>/',
                        flatten: true,
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.distPath %>/',
                        src: ['js/**', 'css/**'],
                        dest: '<%= config.productionPath %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/',
                        src: ['assets/images/**'],
                        dest: '<%= config.productionPath %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/bower_components/font-awesome/',
                        src: ['fonts/**'],
                        dest: '<%= config.productionPath %>/assets/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/bower_components/roboto-fontface/',
                        src: ['fonts/**'],
                        dest: '<%= config.productionPath %>/assets/'
                    }
                ]
            }
        },


        // Add hash on file name to avoid caching
        filerev: {
            options: {
                algorithm: 'md5',
                length: 4
            },
            prod: {
                src: [
                    '<%= config.distPath %>/js/**/*.js',
                    '<%= config.distPath %>/css/**/*.css'
                ]
            }
        },


        // Prepare files to be compressed and uglified
        useminPrepare: {
            html: ['<%= config.app %>/index.html'],
            options: {
                dest: '<%= config.distPath %>/',
                flow: {
                    html: {
                        steps: {
                            js: ['concat'],
                            css: ['concat', 'cssmin']
                        },
                        post: {}
                    }
                }
            }
        },


        // Change file paths to concatenated and filereved ones
        usemin: {
            html: ['<%= config.distPath %>/index.html'],
            options: {
                dest: '<%= config.distPath %>/'
            }
        },


        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            prod: {
                files: {
                    '<%= config.distPath %>/js/app.js': '<%= config.distPath %>/js/app.js'
                }
            }
        },


        // Uglify just concatenated app.js file
        uglify: {
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%= config.distPath %>/js/',
                    src: 'app.js',
                    dest: '<%= config.distPath %>/js/'
                }]
            }
        },


        // Generate template cache
        html2js: {
            options: {
                module: 'templates-fiddus',
                quoteChar: '\'',
                useStrict: true,
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                rename: function (moduleName) {
                    return moduleName.replace('../app/', '');
                }
            },
            build: {
                src: ['app/**/*Tpl.html'],
                dest: '<%= config.buildPath %>/js/templates.js'
            },
            prod: {
                src: ['app/**/*Tpl.html'],
                dest: '<%= config.app %>/js/templates.js'
            }
        },


        // Minify HTML
        htmlmin: {
            deploy: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.productionPath %>/',
                    src: ['index.html'],
                    dest: '<%= config.productionPath %>/'
                }]
            }
        },


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
                    '<%= config.app %>/assets/**/*.scss'
                ],
                tasks: ['sass:build', 'copy:build']
            },
            js: {
                files: [
                    '<%= config.app %>/app/**/*.js'
                ],
                tasks: ['jshint', 'jscs', 'copy:build']
            }
        },


        // Add new app release
        release: {
            options: {
                npm: false,
                indentation: '    ',
                beforeBump: ['check'],
                github: {
                    repo: 'fiddus/client-template',
                    usernameVar: 'GITHUB_USERNAME',
                    passwordVar: 'GITHUB_ACCESS_TOKEN'
                }
            }
        }
    });


    /************************************************************************
     * Registered Tasks
     ************************************************************************/


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
        'html2js:build',
        'wiredep:all',
        'copy:build'
    ]);


    grunt.registerTask('production', [
        'clean:prod',
        'check',
        'env:prod',
        'wiredep:all',
        'html2js:prod',
        'copy:dist',
        'sass:prod',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'ngAnnotate',
        'uglify',
        'filerev',
        'usemin',
        'copy:prod',
        'htmlmin',
        'clean:after'
    ]);


    grunt.registerTask('serve', [
        'build',
        'connect:livereload',
        'watch'
    ]);


    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` next time.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });
};
