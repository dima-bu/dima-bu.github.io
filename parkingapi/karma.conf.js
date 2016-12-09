module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: ['tests/builder.js'],
        browsers: ['PhantomJS'],
        preprocessors: {
            // add webpack as preprocessor
            'tests/builder.js': ['webpack']
        },
        reporters: [
            'progress',
            'coverage'
        ],
        webpack: {
            entry: ['babel-polyfill'],
            devtool: "inline-source-map",
            module: {
                loaders: [
                    {
                        test: /.jsx?$/,
                        loader: 'babel',
                        exclude: /node_modules/,
                        query: {
                            presets: ['es2015', 'react'],
                            plugins: ['transform-runtime']
                        }
                    }
                ],
                postLoaders: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|resources\/js\/vendor)/,
                        loader: 'istanbul-instrumenter'
                    }
                ],
                noParse: []
            },
            externals: {
                /*'jsdom': 'window',
                'cheerio': 'window',
                'react/lib/ExecutionEnvironment': true*/
                'cheerio': 'window',
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            }
        },

        coverageReporter: {
            dir: 'build/reports/coverage',
            reporters: [
                {
                    type: 'html',
                    subdir: 'report-html'
                },
                {
                    type: 'lcov',
                    subdir: 'report-lcov'
                },
                {
                    type: 'cobertura',
                    subdir: '.',
                    file: 'cobertura.txt'
                }
            ]
        },

        plugins: [
            'karma-phantomjs-launcher',
            'karma-mocha',
            'karma-chai',
            'karma-webpack',
            'karma-sinon',
            'karma-coverage'
        ]/*,
        babelPreprocessor: {
            options: {
                presets: ['es2015','airbnb']
            }
        }*/
    })
};