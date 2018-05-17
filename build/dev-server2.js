const express = require('express');
const webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config0 = require('./redux.dev.js');
// const config1 = require('./webpack.1.config.js');

const webpackConfigs = [config0];
// const hotClientScript = 'webpack-hot-middleware/client?reload=true';
const hotClientScript = './build/dev-client';

// 实现多配置文件编译
webpackConfigs.forEach((config, index) => {

  // 给入口加上client的Script
  Object.keys(config.entry).forEach(function(name) {
    config.entry[name] = [`${hotClientScript}?path=/__webpack_hmr_${config.name}`].concat(config.entry[name]);
  });

  const compiler = webpack(config);
  // WebpackDevMiddleware @2 的配置
  const devMiddleware = WebpackDevMiddleware(compiler, {
    // quiet: false,
    logLevel: 'error', // trace debug info warn error silent
    publicPath: config.output.publicPath
  });

  const hotMiddleware = WebpackHotMiddleware(compiler, {
    path: `/__webpack_hmr_${config.name}`,
    noInfo: true,
    log: () => {}
  });

  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
      // hotMiddleware.publish({ action: 'reload' });
      cb();
    });
  });

  app.use(devMiddleware, hotMiddleware);

  devMiddleware.waitUntilValid(() => { /*console.log("编译完成"); */ })

  // if (index === webpackConfigs.length) {

  // }

});

// Serve the files on port 7026.
app.listen(7026, function() {
  console.log('Example app listening on port 7026!\n');
});