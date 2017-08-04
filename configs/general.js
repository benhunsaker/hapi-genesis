const Path = require('path');

const root = Path.join(__dirname, '..');


module.exports = {
    dbUrl: 'mongodb://localhost:27017',
    hostname: process.env.HOSTNAME || 'localhost',
    port: process.env.PORT || 8000,
    coverage: {
        dir: root + '/coverage/combined',
        reporters: ['json', 'html', 'text', 'lcov']
        // thresholds: {
        //     global: 90
        // }
    },
    paths: {
        js: [
            `${root}/**/*.js`,
            `!${root}/+(.git|coverage|dist|node_modules)/**/*.js`
        ],
        json: [
            '**/*.json',
            '!coverage/**',
            '!node_modules/**'
        ],
        sass: `${root}/assets/styles/**/*.scss`,
        tests: [`${root}/tests/**/*.js`]
    }
};
