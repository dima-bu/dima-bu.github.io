module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //less: {
        //    development: {
        //        options: {
        //            compress: true,
        //            yuicompress: true,
        //            optimization: 2,
        //            sourceMap: true,
        //            sourceMapFilename: 'code/css/style.css.map',
        //            sourceMapRootpath: 'http://localhost:63342/dima-bu.github.io/hive/'
        //        },
        //        files: {
        //            "code/css/style.css": "less/style.less"
        //        }
        //    }
        //},
        watch: {
            scripts: {
                files: ['less/*.less'],
                tasks: ['less', 'autoprefixer', 'inline'],
                options: {
                    nospawn: true,
                    livereload: true
                }
            },
            jade: {
                files: "**/*.jade",
                tasks: "jade"
            },
            sprite: {
                files: "forsprites/*.png",
                tasks: "sprite"
            },
            uglify: {
                files: "code/js/*.*",
                tasks: "uglify"
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
        grunticon: {
            myIcons: {
                files: [{
                    expand: true,
                    cwd: 'svgs/',
                    src: ['*.svg', '*.png'],
                    dest: "code/svg"
                }],
                options: {
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
                    pretty: false,
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
    grunt.loadNpmTasks('grunt-grunticon');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    //grunt.registerTask('default', ['less', 'jade', 'uglify', 'watch']);
    grunt.registerTask('default', ['jade', 'watch']);
};