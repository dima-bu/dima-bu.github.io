module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: false,
                    optimization: 2,
                    sourceMap: true,
                    sourceMapFilename: 'code/css/main.min.css.map',
                    sourceMapRootpath: 'http://localhost:63342/activetour/'
                },
                files: {
                    "code/css/style.css": "less/style.less"
                }
            }
        },
        watch: {
            scripts: {
                files: ['less/*.less', 'less/**/*.less'],
                tasks: ['less'],
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
                files: "forsprites/**/*.png",
                tasks: "sprite"
            }
//            autoprefixer: {
//                files: "code/css/*.css",
//                tasks: "autoprefixer"
//            }
        },
        concat: {
            dist: {
                src: [
                    'code/js/vendor/*.js'
                ],
                dest: 'code/js/all.js'
            }
        },
        uglify: {
            my_target: {
                files: {
//                    'code/js/vendor/bootstrap.min.js': ['bootstrap/bootstrap.js'],
                    'code/js/all.min.js': ['code/js/all.js']
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
                    pretty: true
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
        },
        sprite: {
            all: {
                src: [
                     'forsprites/**/*.png'
                    ],
                destImg: 'code/img/sprite.png',
                destCSS: 'code/css/sprite.css',
                padding: 10,
                'cssOpts': {
                    // Some templates allow for skipping of function declarations
                    'functions': false,
                    // CSS template allows for overriding of CSS selectors
                    'cssClass': function(item) {
                        return '.' + item.name;
                    }
                },
                'imgOpts': {
                    // Format of the image (inferred from destImg' extension by default) (jpg, png)
                    'format': 'png',
                    // gm only: Quality of image
                    'quality': 100,
                    // phantomjs only: Milliseconds to wait before terminating PhantomJS script
                    'timeout': 10000
                }
            },
            less: {
                src: [
                        'forsprites/**/*.png'

                     ],
                destImg: 'code/img/sprite.png',
                destCSS: 'less/general/sprite-variables.less',
                padding: 10,
                'cssOpts': {
                    // Some templates allow for skipping of function declarations
                    'functions': true,
                    // CSS template allows for overriding of CSS selectors
                    'cssClass': function(item) {
                        return '.' + item.name;
                    }
                },
                'imgOpts': {
                    // Format of the image (inferred from destImg' extension by default) (jpg, png)
                    'format': 'png',
                    // gm only: Quality of image
                    'quality': 100,
                    // phantomjs only: Milliseconds to wait before terminating PhantomJS script
                    'timeout': 10000
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 0.1%']
            },
            single_file: {
                options: {
                    // Target-specific options go here.
                },
                src: 'code/css/style.css',
                dest: 'code/css/style-ap.css'
            }
        },
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['/code/style.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['/code/done/style.css']
            }
        }

    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-autoprefixer');
    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['less','jade', 'concat', 'uglify', 'sprite','watch']);
};