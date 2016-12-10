const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = [
    {
        entry: {
            client: './src/client.js'
        },
        devtool: 'source-map',
        output: {
            filename: '[name].[hash].js',
            path: __dirname + '/dist',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: [
                            [
                                'env',
                                {
                                    modules: false,
                                    browsers: [
                                        'last 2 versions',
                                        'safari 8',
                                        'not ie <= 10'
                                    ],
                                },
                            ],
                        ],
                        plugins: [
                            'inferno',
                            'transform-object-rest-spread',
                        ],
                    }
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                },
                {
                    test: /firebase/,
                    loader: StringReplacePlugin.replace({
                        replacements: [
                            {
                                pattern: /"process"/ig,
                                replacement: function () {
                                    return '"thisisnotdefinedok"';
                                },
                            },
                        ]
                    }),
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new ManifestPlugin({
                fileName: 'build-manifest.json',
            }),
            new StringReplacePlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production'),
                },
            }),
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
        ],
    },
    {
        entry: {
            server: ['babel-polyfill', './src/server.js'],
        },
        output: {
            filename: '[name].js',
            path: __dirname + '/dist',
        },
        target: 'node',
        devtool: 'inline-source-map',
        node: {
            console: false,
            process: false,
            global: false,
            Buffer: false,
            setImmediate: false,
            __filename: false,
            __dirname: false,
        },
        plugins: [
            new webpack.IgnorePlugin(/vertx/),
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: [
                            ['env', { modules: false, node: true } ],
                        ],
                        plugins: [
                            'inferno',
                            'transform-object-rest-spread',
                        ],
                    }
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                },
            ],
        },
    },
];
