var path = require('path');
const webpack = require("webpack");
// var utils = require('./utils')
// var config = require('../config')
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssOptions = require("./postcss.config");
//  {
//     sourceMap: true,
//     ident: 'postcss',
//     plugins: () => [
//         autoprefixer({
//             browsers: [
//                 '>1%',
//                 'last 4 versions',
//                 'Firefox ESR',
//                 'not ie < 9', // React doesn't support IE8 anyway
//             ]
//         }),
//     ]
// }

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    name: "main",
    entry: {
        app: ['./src/app'],
        // app: ['babel-polyfill', './src/main'],
    },
    output: {
        path: resolve("dist"),
        filename: '[name].js',
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            // '@': resolve('src'),
            // 'antd': resolve('src/assets/antd'),
            // 'api': resolve('src/api'),
            // 'jstree': resolve('src/assets/jstree/src/jstree'),
        }
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                // include: [resolve('src'), resolve('tests')]
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024, //文件小于1kb 转成Data URL
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1024, //小于1kb 转成Data URL
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                importLoaders: 2 // 前面有几个loader
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: postcssOptions
                        },
                        {
                            loader: "less-loader",
                            options: {
                                sourceMap: true,
                            }
                        }
                    ]
                })
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: postcssOptions
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({ filename: "css/[name].[contenthash:7].css" }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: true,
            excludeChunks: ['login', 'flow']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            // minChunks: 2,
            minChunks: function(module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
    ]
}