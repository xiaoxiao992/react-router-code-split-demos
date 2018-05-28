import React from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';




// console.log("reducers0000", reducers);

// Todo: 为了更好的 code splitting， 动态的注入 reducer。
// Store


const storeProvider = (function() {
    var instance;

    function createInstance() {

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

        // var object = new Object("I am the instance");
        //     return object;

        const store = createStore(() => ({}), initialState, compose(...enhancers));

        return store;
    }

    return {
        getStore: () => {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
        clearStore: () => {
            instance = null;
        }
    };
})();

export default storeProvider;