import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { combineReducers } from 'redux';
import Loadable from 'react-loadable';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import loadable from 'loadable-components';
import loadable, { LOADABLE, componentTracker } from 'loadable-components';
import promiseMiddleware from 'redux-promise-middleware';


// react-loadable 配置参数
// 更多信息，访问： https://github.com/jamiebuilds/react-loadable#loadable
const cached = {};


const middlewares = [
    thunk,
    promiseMiddleware({ promiseTypeDelimiter: "/" }),
    // asyncMiddleware
];
const initialState = {};

// 启用 REDUX_DEVTOOLS
let devtools = () => noop => noop;
if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    devtools = window.__REDUX_DEVTOOLS_EXTENSION__;
}

const enhancers = [
    applyMiddleware(...middlewares),
    devtools(window.__REDUX_DEVTOOLS_EXTENSION__OPTIONS),
    // ...extraEnhancers,
];

// console.log("reducers0000", reducers);

// Todo: 为了更好的 code splitting， 动态的注入 reducer。
// Store

export const store = () => {
    return createStore(() => {
        console.log('090909090');
        return {}
    }, initialState, compose(...enhancers))
};




export default (component, modules, opts) => {

    // class LoadComponent extends React.Component {

    // }


    const What = loadable(async () => {
        const [{ default: Component }, { default: books }] = await Promise.all([
            component(),
            { name: '' }
            //   import('./books.json'),
        ])
        console.log(store)

        return props => <Component {...props} books={books} />
    })


    return What;

    const myload = async (store) => {
        console.log("this.store", store);
        const [{ default: Component }, { default: Reducers }] =
            await Promise.all([
                component(),
                import(`../reducers/app.jsx`)
            ])

        console.log('ss');

        return props => <Component {...props} />

    }

    class ComponentWithStore extends React.Component {

        constructor(props) {
            super(props)
            console.log('constructor');
        }
        static componentId = componentTracker.track(ComponentWithStore, [`${Math.random()}`]);

        static contextTypes = {
            store: PropTypes.object
        };

        // static load = async (store) => {
        //     console.log("this.store", store);
        //     const [{ default: Component }, { default: Reducers }] =
        //         await Promise.all([
        //             component(),
        //             import(`../reducers/app.jsx`)
        //         ])

        //     console.log('ss');

        //     return props => <Component {...props} />

        // }
        state = { Component: () => null }

        static [LOADABLE] = () => {
            console.log('thisiss', this.context)
            return {
                componentId: ComponentWithStore.componentId,
                load: myload,
            }
        }

        componentWillMount() {

            const { store } = this.context;
            // console.log('ComponentWithTranslations', LOADABLE, ComponentWithStore[LOADABLE])
            ComponentWithStore[LOADABLE]().load(store)
                .then(Component => this.setState({ Component }))
        }

        render() {
            console.log("sdsd", this.state)
            const { Component } = this.state;

            return <Component />
        }

    }

    return ComponentWithStore;



    class ComponentWithTranslations extends React.Component {
        // Required
        static componentId = componentTracker.track(ComponentWithTranslations, ['./jkjmk']);

        static load = async () => {
            // const response = await fetch('/translations.json')
            const translations = { hello: '您好' }//await response.json()
            ComponentWithTranslations.translations = translations
            return translations
        }

        static [LOADABLE] = () => ({
            componentId: ComponentWithTranslations.componentId,
            load: ComponentWithTranslations.load,
        })

        state = { translations: {} }

        componentWillMount() {
            // console.log('ComponentWithTranslations',LOADABLE, ComponentWithTranslations[LOADABLE])
            ComponentWithTranslations[LOADABLE]().load()
                .then(translations => this.setState({ translations }))
        }

        render() {
            console.log(this.state)
            const { translations: { hello = 'hello' } } = this.state;

            return <div>{hello}</div>
        }
    }

    return ComponentWithTranslations;







    return Loadable({
        loading: () => <div className="async-loader-loading">loading</div>,
        loader: async () => Promise.all([component()]),
    })

    function getAsyncComponent(store) {
        return Loadable({
            loading: (props) => {
                console.log('loading-props', props)
                return <div className="async-loader-loading">loading</div>
            },
            loader: component,
        })
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

    // return getAsyncComponent();


    return class AsyncComponent extends Component {

        constructor(props) {
            super(props)
            console.log("66666666666666666666666666666", props)
        }

        static contextTypes = {
            store: PropTypes.object
        };

        state = {

            component: null,
        }
        componentDidMount() {
            const LoadableComponent = Loadable({
                loading: (props) => {
                    console.log('loading-props', props)
                    return <div className="async-loader-loading">loading</div>
                },
                loader: component,
                render: (loaded, props) => {
                    console.log("render", loaded)
                }
            });
            // console.log(<LoadableComponent />);
            //  getAsyncComponent(store);
        }


        render() {
            const { store } = this.context;
            return <div>getAsyncComponent</div>
            // return asyncComponent(store);
            // const Component = getAsyncComponent(store);
            // return <Component />;

        }
    }


}