import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { combineReducers } from 'redux';
// import Loadable from 'react-loadable';
import loadable from 'loadable-components';
import storeProvider from '../utils/storeProvider';

// react-loadable 配置参数
// 更多信息，访问： https://github.com/jamiebuilds/react-loadable#loadable
const cached = {};

export default (component, modules, opts) => {

    const ErrorComponent = ({ error, ownProps }) => { console.log(error); return <div>Oops! {error.message}</div>; };

    return loadable(async () => {

        const reducers = modules.map(m => import(`../reducers/${m}.jsx`));
        // console.log('dddd', `../reducers/${n}.js`);
        // component

        const results = await Promise.all([component(), ...reducers])

        // console.log("books", storeProvider.getStore())
        const [{ default: Component }] = results;

        return props => <Component {...props} />


    }, { ErrorComponent });


}