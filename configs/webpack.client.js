const Path = require('path');
const Webpack = require('webpack');


module.exports = {
    target:  'node',

    entry:   {
        app: ['babel-polyfill', Path.resolve(__dirname, '../assets/js/app.js')]
    },
    output:  {
        path: Path.join(__dirname, '..', 'dist', 'static', 'js'),
        filename: '[name].bundle.js'
    },

    cache:   false,
    context: Path.resolve(__dirname, '..'),
    devtool: 'source-map',
    module:  {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                enforce: 'post',
                exclude: /node_modules/,
                use: [
                    { loader: 'babel-loader' }
                ]
            }
        ],
        noParse: /\.min\.js/
    },
    node:    {
        __dirname: true,
        fs: 'empty'
    },
    plugins: [
        new Webpack.EnvironmentPlugin(['NODE_ENV']),
        new Webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true
        })
    ],
    resolve: {
        modules: [
            'node_modules',
            Path.resolve(__dirname, 'lib')
        ],
        extensions: ['.json', '.js']
    }
};
