var path = require('path');
var webpack = require('webpack');
var p = require("babel-polyfill");

module.exports = {
    plugins: [new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })],
    debug: false,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src/app"),
                    path.resolve(__dirname, "app/test")
                ],
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: [
                        'es2015', 'es2016'
                    ],
                    plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties']
                }
            }
        ]
    },
    entry: [
        'babel-polyfill', './src/app/distribute-tasks.js'
    ],
    output: {
        publicPath: './src/dist',
        filename: './src/dist/distribute-tasks.js'
    }

};