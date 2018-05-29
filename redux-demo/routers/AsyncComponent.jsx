import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { combineReducers } from 'redux';
// import Loadable from 'react-loadable';
import loadable from 'loadable-components';
import storeProvider from '../utils/storeProvider';
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

// Todo: 为了更好�code splitting�动态的注入 reducer�
// Store

export const store = () => {
    return createStore(() => {
        console.log('090909090');
        return {}
    }, initialState, compose(...enhancers))
};




export default (component, modules, opts) => {

    const ErrorComponent = ({ error, ownProps }) => { console.log(error); return <div>Oops! {error.message}</div>; };

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






            loading: (props) => {
                console.log('loading-props', props)
                return <div className="async-loader-loading">loading</div>
            },
            loader: component,
        })

    return loadable(async () => {

        const reducers = modules.map(m => import(`../reducers/${m}.jsx`));
        // console.log('dddd', `../reducers/${n}.js`);
        // component
        }

        const results = await Promise.all([component(), ...reducers])
            store: PropTypes.object
        };

        // console.log("books", storeProvider.getStore())
        const [{ default: Component }] = results;

        return props => <Component {...props} />
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

            return <div>getAsyncComponent</div>
            // return asyncComponent(store);

    }, { ErrorComponent });


}