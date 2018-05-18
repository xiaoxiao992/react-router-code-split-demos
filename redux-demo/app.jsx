import React from 'react'
import ReactDOM from 'react-dom';
// import Loadable from 'react-loadable';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import reducers from './reducers';

import 'antd/es/style/index.less';
import './app.less';

// import {
//     Index, User
// } from "./routers";
import AsyncLoader from './routers/AsyncLoader';

// const AsyncUser = AsyncLoader({ loader: () => import('./views/user') });
const IndexAsync = AsyncLoader({ loader: () => import('./views/index') });

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

// Todo: 为了更好的 code splitting， 动态的注入 reducer。
// Store
const store = createStore(reducers, initialState, compose(...enhancers));


class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

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