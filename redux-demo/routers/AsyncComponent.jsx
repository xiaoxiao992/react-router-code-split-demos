import React from 'react';
import { combineReducers } from 'redux';
import Loadable from 'react-loadable';
import storeProvider from '../utils/storeProvider';
import { Spin } from 'antd';

// react-loadable 配置参数
// 更多信息，访问： https://github.com/jamiebuilds/react-loadable#loadable


export default (component, models = [], opts) => {
  const store = storeProvider.getStore();

  const LoadingComponent = () => <Spin />;//(<div></div>);

  // 找到没有缓存过的 reducer;
  const cachedKeys = Object.keys(store.asyncReducers);
  const noCachedModels = models.filter(m => !cachedKeys.includes(m));
  const resolveModels = noCachedModels.map(m => import(`../reducers/${m}`));
  //.reduce((prev, current) => ({ ...prev, ...current }), {});

  const AsyncComponent = Loadable({
    loading: LoadingComponent,
    loader: async () => {

      // 第一个是组件，从第二个开始是 reducer;
      const values = await Promise.all([component(), ...resolveModels]);

      const [{ default: LoadableComponent }] = values;

      if (values.length > 1) {
        values.slice(1)
          .map(m => m.default)
          .forEach(m => {
            store.asyncReducers[m.namespace] = m.reducers;
          });

        //
        store.replaceReducer(combineReducers(store.asyncReducers));
      }
      console.log('store.asyncReducers', store.asyncReducers);
      // console.log('LoadableComponent', LoadableComponent);

      return props => <LoadableComponent {...props} />

    },

    // timeout: 10000, // 加载模块的过期时间
    // delay: 300,  // 加载延时
    // ...opts
  });

  return AsyncComponent;
}