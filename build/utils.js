var path = require('path');
var config = require('../config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssOptions = require("./postcss.config");

// 不参与css-module的目录和文件
const excludeCssModules = [/node_modules/, /assets/, /\.css/];

exports.assetsPath = function(_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path);
}

exports.cssLoaders = function(options) {
    options = options || {};

    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap,
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: postcssOptions
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader, postcssLoader];
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: {
                    ...loaderOptions,
                    sourceMap: options.sourceMap
                }
            });
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'style-loader'
            });
        } else {
            return ['style-loader'].concat(loaders);
        }
    }

    return {
        css: generateLoaders(),
        less: generateLoaders('less'),
    };
}

exports.styleLoaders = function(options) {
    var output = [];
    var loaders = exports.cssLoaders(options);
    for (var extension in loaders) {
        var loader = loaders[extension];

        var rule = {
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        }

        // 如果开启css modules 则把node_modules 排除掉
        if (options.cssModules) {

            // 第一个rule只编译 excludeCssModules
            rule.include = excludeCssModules;

            // 浅copy一个loader
            const m_loader = loader.map(item => {
                return {
                    ...item,
                    options: item.loader === "css-loader" ? {
                        ...item.options,
                        modules: true,
                        localIdentName: "[local]___[hash:base64:5]"
                    } : {...item.options }
                }
            });

            // 第二个rule 不编译 excludeCssModules
            var m_rule = {
                test: new RegExp('\\.' + extension + '$'),
                exclude: excludeCssModules,
                use: m_loader
            }

            output.push(m_rule);
        }

        output.push(rule);
    }

    return output;
}