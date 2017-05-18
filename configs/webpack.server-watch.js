'use strict';


const Webpack = require('webpack');

const Config = require('./webpack.server');


Config.cache = true;
Config.watch = true;


module.exports = Config;
