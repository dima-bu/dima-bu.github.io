module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sprite: {
            all: {
                src: 'forsprite/*.png',
                destImg: 'assets/sprite.png',
                destCSS: 'css/sprite.css',
//                destCSS: 'assets/stylesheets/sprite.scss',


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
            }
        },

        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    'css/style.css': 'assets/stylesheets/style.scss'
                }

            }
        },

        haml: {
            dist: {
                files: {
                    'html/index.html': 'haml/index.haml',
                    'html/company.html': 'haml/company.haml',
                    'html/categories.html': 'haml/categories.haml',
                    'html/deal-alerts.html': 'haml/deal-alerts.haml',
                    'html/blog.html': 'haml/blog.haml',
                    'html/blog-post.html': 'haml/blog-post.haml',
                    'html/search.html': 'haml/search.haml'
                }
            }
        },
        watch: {
            scripts: {
                files: ['assets/stylesheets/*/*.scss', 'assets/stylesheets/*.scss'],
                tasks: ['sass']
            },
            haml: {
                files: "haml/*.haml",
                tasks: "haml"
            },
            sprite: {
                files: "forsprite/*.png",
                tasks: "sprite"
            }
        }

    });



    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-haml');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sprite', 'haml', 'sass', 'watch']);

};