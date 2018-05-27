import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { combineReducers } from 'redux';
import Loadable from 'react-loadable';

// react-loadable 配置参数
// 更多信息，访问： https://github.com/jamiebuilds/react-loadable#loadable
const cached = {};

export default (component, modules, opts) => {

    console.log("555555555555555555555555", component)

    return Loadable({
        loading: () => <div className="async-loader-loading">loading</div>,
        loader: component,
    })

    function getAsyncComponent(store) {

        const keys = Object.keys(cached);
        // const models = typeof resolveModels === 'function' ? resolveModels() : [];
        // console.log('models', models);
        // 'app'

        // const _models = modules.filter(m => keys.indexOf(m) < 0);

        // const reducers = () => modules
        //     .map(m => ({ [`reducer:${m}`]: () => import(`../reducers/${m}.jsx`) }))
        //     .reduce((prev, current) => {
        //         return {
        //             ...prev,
        //             ...current
        //         }
        //     }, {});

        // console.log('get reducers', reducers());


        // console.log('storestorestorestorestorestorestorestorestore', reducers());

        // return Loadable({
        //     loading: () => <div className="async-loader-loading">loading</div>,
        //     loader: component,
        // })
        console.log("2222222222222222222222222222")
        function getLoader() {
            console.log("loaderloaderloaderloaderloader")
            return {
                component,
            }
        }

        const myloader = getLoader();



        return Loadable.Map({
            loading: () => <div className="async-loader-loading">loading</div>,
            loader: myloader,
            /*
            loader: () => {

                const __models = reducers();

                // console.log('reducers', __models);
                new Promise(resolve => {
                    Promise.all([...__models]).then(ret => {

                        if (!__models || !__models.length) {
                            return resolve(ret[0]);
                        } else {

                            console.log('storestorestorestorestore', ret)

                            const _reducers = {};
                            ret.forEach(r => {
                                const m = r.default;
                                _reducers[m.namespace] = m.reducers;
                                cached[m.namespace] = 1
                            });
                            // ret.forEach(m => {  });
                            console.log('_reducers', _reducers)

                            store.replaceReducer(combineReducers(_reducers));
                            // const len = __models.length;
                            // ret.slice(0, len).forEach((m) => {
                            //     // registerModel(app, m);
                            // });
                            resolve(ret[ret.length]);
                        }

                        // console.log('ret', ret);
                        // ret.forEach(re => {
                        //     console.log('mmm', re);
                        // })


                    });
                })

                return component();
            },
            */
            // timeout: 10000, // 加载模块的过期时间
            // delay: 300,  // 加载延时
            // ...opts,
            // loader: () => loader(),
            // loader: () => import('../views/index'),
            // modules: ['./my-component'],

            render: (loaded, props) => {
                // console.log('componentscomponentscomponents', components.length, components);
                console.log("loaded", loaded)
                let Component = loaded.component.default;
                // const Component = components[components.length - 2]
                // const reducers = components.slice(0, components.length - 2)

                return <Component {...props} />

            }

        });
    }

    return getAsyncComponent();


    // return class AsyncComponent extends Component {

    //     static contextTypes = {
    //         store: PropTypes.object
    //     };

    //     state = {

    //         component: null,
    //     }
    //     componentDidMount() {
    //         //  getAsyncComponent(store);
    //     }


    //     render() {
    //         const { store } = this.context;
    //         // return asyncComponent(store);
    //         const Component = getAsyncComponent(store);
    //         return <Component />;

    //     }
    // }


}