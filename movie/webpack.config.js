var path = require('path');
var webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var System = require('systemjs');

//const Config = require('./configWidget');
//console.log(Config);
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
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },

        ]
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
        //new webpack.DefinePlugin({
        //    HeaderPath: JSON.stringify(Config.pathToHeader)/*{
        //        'city': JSON.stringify('default')
        //    }*/
        //}),
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    resolve: {
        extensions: ['', '.js', '.less'],
        modulesDirectories: ['src', 'node_modules']
    }
};