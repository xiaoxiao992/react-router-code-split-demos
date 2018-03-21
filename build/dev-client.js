(function() {
    'use strict';
    require('eventsource-polyfill');

    const options = Object.assign({ reload: true }, require('querystring').parse(__resourceQuery.slice(1)));

    // autoConnect=false 设置自动连接为手动连接，以改变client的参数；
    const WebpackHotMiddlewareClient = require('webpack-hot-middleware/client?autoConnect=false&reload=true');

    WebpackHotMiddlewareClient.setOptionsAndConnect(options);

    // client 订阅事件
    WebpackHotMiddlewareClient.subscribe(function(payload) {

        // 当接收到刷新事件时，刷新当前页面
        if (payload.action === 'reload' || payload.reload === true) {
            window.location.reload();
        }

    });

    module.exports = WebpackHotMiddlewareClient;
}());