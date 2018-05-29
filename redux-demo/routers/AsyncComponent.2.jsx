import React from 'react';
import { combineReducers } from 'redux';
import loadable from 'loadable-components';
import storeProvider from '../utils/storeProvider';

// loadable-components 配置参数
// 更多信息，访问： https://github.com/smooth-code/loadable-components


export default (component, models = [], opts) => {
    const store = storeProvider.getStore();
    const ErrorComponent = ({ error, ownProps }) => { console.log('ErrorComponent', error); return <div>Oops! {error.message}</div>; };
    const LoadingComponent = () => (<div>Loading...</div>);
    const options = {
        ErrorComponent,
        LoadingComponent
    }

    // 找到没有缓存过的 reducer;
    const cachedKeys = Object.keys(store.asyncReducers);
    const noCachedModels = models.filter(m => !cachedKeys.includes(m));
    const resolveModels = noCachedModels.map(m => import(`../reducers/${m}`));

    const AsyncComponent = loadable(async () => {

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

        return props => <LoadableComponent {...props} />

    }, options);

    return AsyncComponent;
}