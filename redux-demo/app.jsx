import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// import Loadable from 'react-loadable';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
// import template from './template.html';

// import reducers from './reducers';

import 'antd/es/style/index.less';
import './app.less';

// import {
//     Index, User
// } from "./routers";
import AsyncComponent from './routers/AsyncComponent';



// const AsyncUser = AsyncLoader({ loader: () => import('./views/user') });
const IndexAsync = AsyncComponent(() => import('./views/index'), ['app']);

// import DynamicComponent from './routers/DynamicComponent';

// const IndexC = DynamicComponent(() => import('./views/index'), { loader: () => import('./views/index') });

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
const store = createStore(() => ({}), initialState, compose(...enhancers));


class App extends React.Component {



  static contextTypes = { store: PropTypes.object };

  constructor(props) {
    super(props);
    console.log("App-context", this.context);
  }

  componentDidMount() {
    // console.log('store', this.context)
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            {/* <Route path="/user" exact={false} component={AsyncUser} /> */}
            <Route path="/" exact={false} component={IndexAsync} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </Provider>
    );
  }
};

ReactDOM.render(<App />, document.getElementById("root"));