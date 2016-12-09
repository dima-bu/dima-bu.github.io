var path = require('path');
var webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//var SvgStore = require('webpack-svgstore-plugin');
var VERSION = '';

var index = process.argv.indexOf('--build-version');


if (index >= 0) {
    VERSION = process.argv[index+1];
}

module.exports = {
    entry: './main.js',
    output: {
        path: __dirname+'/bundle', filename: 'bundle.js' ,
        publicPath: '/bundle/'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
            /*{
                test: /\.svg$/,
                loader: 'svg-sprite?' + JSON.stringify({
                    name: '[name]'
                })
            }*/
        ]
    },
    watch: true,
    cache: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            "BUILD_VERSION": JSON.stringify(VERSION)
        })
        //new SvgStore(path.join( './', 'svg', '*.svg'), path.join('./', 'svg'), {
        //    name: '[hash].sprite.svg',
        //    chunk: 'app',
        //    prefix: 'icon-',
        //    svgoOptions: {
        //        // options for svgo, optional
        //    }
        //})
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    },
    resolve: {
        extensions: ['', '.js', '.less'],
        modulesDirectories: ['src', 'node_modules']
    }
};