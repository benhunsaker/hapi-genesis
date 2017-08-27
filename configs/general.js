const Path = require('path');

const root = Path.join(__dirname, '..');
const hmr_port = /* istanbul ignore next */ process.env.hmr_port || 8081;


module.exports = {
    dbUrl: 'mongodb://localhost:27017/hapi-genisus',
    hmr_port,
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
