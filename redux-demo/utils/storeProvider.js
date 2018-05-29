import React from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

// Todo: 为了更好的 code splitting， 动态的注入 reducer。
// Store
// 确保 store 都是同一个对象，使用单例模式；

const storeProvider = (() => {
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

    ];

    const store = createStore(() => ({}), initialState, compose(...enhancers));
    store.asyncReducers = {};
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