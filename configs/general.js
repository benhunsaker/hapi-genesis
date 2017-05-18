'use strict';


const Path = require('path');

const root = Path.join(__dirname, '..');


module.exports = {
    dbUrl: 'mongodb://localhost:27017',
    hostname: process.env.HOSTNAME || 'localhost',
    port: process.env.PORT || 8000,
    paths: {
        js: [
            root + '/**/*.js',
            '!' + root + '/+(.git|coverage|dist|node_modules)/**/*.js'
        ],
    }
}
