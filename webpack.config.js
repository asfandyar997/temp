const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: [
        '@babel/polyfill',
        './js/src/app/app.js'
    ],
    output: {
        path: path.resolve(__dirname, './js/dist'),
        publicPath: '/js/dist/',
        filename: 'app.min.js'
    },
    mode: 'production',
    devtool: false,
    performance: {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000 * 2
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
                minify: (file, sourceMap) => {
                    /*
                     * See https://github.com/mishoo/UglifyJS2#minify-options for options
                     */
                    const uglifyJsOptions = {};

                    if (sourceMap) {
                        uglifyJsOptions.sourceMap = {
                            content: sourceMap,
                        };
                    }

                    return require('uglify-js').minify(file, uglifyJsOptions);
                },
            })
        ],
        chunkIds: 'total-size'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
};
