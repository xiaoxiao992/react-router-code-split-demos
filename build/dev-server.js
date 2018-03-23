const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config0 = require('./webpack.config.js');
const config1 = require('./webpack.1.config.js');

const webpackConfigs = [config0, config1];
// const hotClientScript = 'webpack-hot-middleware/client?reload=true';
const hotClientScript = './build/dev-client';

// 实现多配置文件编译
webpackConfigs.forEach((config, index) => {

    // 给入口加上client的Script
    Object.keys(config.entry).forEach(function(name) {
        config.entry[name] = [`${hotClientScript}?path=/__webpack_hmr_${config.name}`].concat(config.entry[name]);
    });

    const compiler = webpack(config);
    // webpackDevMiddleware @2 的配置
    const devMiddlewareInstance = webpackDevMiddleware(compiler, {
        // quiet: false,
        logLevel: 'error', // silent // error
        publicPath: config.output.publicPath
    });

    const HotMiddlewareInstance = webpackHotMiddleware(compiler, {
        path: `/__webpack_hmr_${config.name}`,
        log: false
    });

    compiler.plugin('compilation', function(compilation) {
        // console.log("-----------------------compilation--------------------");
        compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
            // console.log("-----------------------compilation--------------------", data);
            HotMiddlewareInstance.publish({ action: 'reload' });
            cb();
        });
    });

    app.use(devMiddlewareInstance, HotMiddlewareInstance);

devMiddlewareInstance.waitUntilValid(() => { /*console.log("编译完成"); */})

    // if (index === webpackConfigs.length) {

    // }

});
/*
const compiler = webpack(config);
const webpackDevInstance = webpackDevMiddleware(compiler, {
    noInfo: true,
    quiet: true,
    publicPath: config.output.publicPath
});
const webpackHotInstance = webpackHotMiddleware(compiler, { });

compiler.plugin('compilation', function(compilation) {
    console.log("-----------------------compilation--------------------");
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        console.log("-----------------------compilation--------------------", data);
        webpackHotInstance.publish({ action: 'reload' });
        cb();
    });
});


// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevInstance);

app.use(webpackHotInstance);

webpackDevInstance.waitUntilValid((stats) => {
    // console.log('stats', stats);
});
*/
// Serve the files on port 7023.
app.listen(7023, function() {
    console.log('Example app listening on port 7023!\n');
});