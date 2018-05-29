import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// import Loadable from 'react-loadable';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Provider, connect } from 'react-redux';
import storeProvider from './utils/storeProvider';

// import template from './template.html';

// import reducers from './reducers';

import 'antd/es/style/index.less';
import './app.less';

// import {
//     Index, User
// } from "./routers";
import AsyncComponent, { store } from './routers/AsyncComponent';





const IndexAsync = AsyncComponent(() => import('./views/index'), ['app']);

// import DynamicComponent from './routers/DynamicComponent';

// const IndexC = DynamicComponent(() => import('./views/index'), { loader: () => import('./views/index') });


const store = storeProvider.getStore();
const mm = 90;
// mm = 89;
// console.log('ddd', AsyncLoader(90));
// console.log("sdfsdf", store1 === store2)


class App extends React.Component {



  static contextTypes = { store: PropTypes.object };

  constructor(props) {
    super(props);
    // console.log("App-context", this.context);
  }

  componentDidMount() {
    // console.log('store', this.context)
    // SSL_OP_PKCS1_CHECK_2
  }
  componentWillUnmount() {
    storeProvider.clearStore();
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