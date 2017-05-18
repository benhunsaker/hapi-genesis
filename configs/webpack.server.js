'use strict';


const NodeExternals = require('webpack-node-externals');
const Path = require('path');
const Webpack = require('webpack');


module.exports = {
    target:  'node',
    cache:   false,
    context: Path.resolve(__dirname, '..'),
    devtool: 'source-map',
    entry:   ['./index.js'],
    output:  {
        path: Path.join(__dirname, '../dist'),
        filename: 'server.js'
    },
    plugins: [
        new Webpack.EnvironmentPlugin([
            'NODE_ENV'
        ]),
        new Webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false })
    ],
    module:  {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.js$|\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ],
        noParse: /\.min\.js/
    },
    externals: [NodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    })],
    resolve: {
        modules: [
            "node_modules",
            Path.resolve(__dirname, 'lib')
       ],
        extensions: ['.json', '.js']
    },
    node:    {
        __dirname: true,
        fs: 'empty'
    }
};
