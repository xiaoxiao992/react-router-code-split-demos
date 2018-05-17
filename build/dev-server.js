const express = require('express');
const webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config0 = require('./webpack.conf.js');
// const config1 = require('./webpack.1.config.js');

const webpackConfigs = [config0];
// const hotClientScript = 'webpack-hot-middleware/client?reload=true';
const hotClientScript = './build/dev-client';

// 实现多配置文件编译
webpackConfigs.forEach((config, index) => {

    // 给入口加上client的Script
    Object.keys(config.entry).forEach(name => {
        config.entry[name] = [`${hotClientScript}?path=/__webpack_hmr_${config.name}`].concat(config.entry[name]);
    });

    const compiler = webpack(config);

    // WebpackDevMiddleware @2 的配置
    const devMiddleware = WebpackDevMiddleware(compiler, {
        // quiet: false,
        logLevel: 'error', // silent // error
        publicPath: config.output.publicPath
    });

    const hotMiddleware = WebpackHotMiddleware(compiler, {
        path: `/__webpack_hmr_${config.name}`,
        log: false
    });

    compiler.plugin('compilation', compilation => {
        // console.log("-----------------------compilation--------------------");
        compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
            // console.log("-----------------------compilation--------------------", data);
            // hotMiddleware.publish({ action: 'reload' });
            cb();
        });
    });

    app.use(devMiddleware, hotMiddleware);

    devMiddleware.waitUntilValid(() => { /*console.log("编译完成"); */ })

});
// Serve the files on port 7023.
app.listen(7023, function() {
    console.log('Example app listening on port 7023!\n');
});