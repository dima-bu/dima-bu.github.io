'use strict';

var multiline = require('multiline');

module.exports = function(grunt) {

    var sassOptions = {
        loadPath: ['scss'],
        precision: 6,
        sourcemap: 'auto',
        style: 'expanded',
        trace: true,
        bundleExec: true
    };

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            sass: {
                files: "sass/*.scss",
                tasks: "sass"
            },
            jade: {
                files: "**/*.jade",
                tasks: "jade"
            },
            sprite: {
                files: "svgs/*.*",
                tasks: "svgstore"
            }

        },
        concat: {
            dist: {
                src: [
                    'code/js/*.js'
                ],
                dest: 'code/js/vendor/all.js'
            }
        },
        svgstore: {
            options: {
                prefix : 'icon-', // This will prefix each ID
                svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
                    viewBox : '0 0 100 100',
                    xmlns: 'http://www.w3.org/2000/svg'
                }
            },

            default:{
                options: {
                    includedemo : multiline.stripIndent(function(){/*

                     {{{svg}}}

                     */})
                },
                files: {
                    './jade/svg/svg-sprite.svg': ['./svgs/*.svg']
                }
            }
        },

        copy: {
            main: {
                files: [
                    { expand: true, src: ['./img/**'], dest: 'code/'},
                    { expand: true, src: ['./fonts/**'], dest: 'code/'},
                    { expand: true, cwd: './bootstrap/dist/css/', src: ['**'], dest: 'code/css'},
                ]
            }
        },

        sass: {
            core: {
                options: sassOptions,
                files: {
                    './code/css/bootstrap.css': './bootstrap/scss/bootstrap.scss'
                }
            }
        },

        jade: {
            compile: {
                options: {
                    data: {
                        debug: true
                    },
                    client: false,
                    pretty: true,
                    //data: grunt.file.readJSON("data.json")
                },
                files:
                        [{
                                cwd: "jade",
                                src: "*.jade",
                                dest: "code",
                                expand: true,
                                ext: ".html"
                            }]
            }
        }

    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-data-uri');
    grunt.loadNpmTasks('grunt-inline');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-inline');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    //grunt.registerTask('default', ['less', 'jade', 'uglify', 'watch']);
    grunt.registerTask('default', ['jade', 'sass', 'watch']);
};