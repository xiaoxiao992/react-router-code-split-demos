import React from 'react';
import L from 'react-loadable';

// react-loadable 配置参数
// 更多信息，访问： https://github.com/jamiebuilds/react-loadable#loadable

export default (opts) => L({
    loading: () => <div className="async-loader-loading">loading</div>,
    timeout: 10000, // 加载模块的过期时间
    // delay: 300,  // 加载延时
    ...opts
});