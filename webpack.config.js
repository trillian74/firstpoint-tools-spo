var path = require('path');
var webpack = require('webpack');
var p = require("babel-polyfill");

module.exports = {
    entry: [
        'babel-polyfill',
        './src/app/distribute-tasks.js'
    ],
    output: {
        publicPath: './src/dist',
        filename: 'distribute-tasks.js'
    }
    
};