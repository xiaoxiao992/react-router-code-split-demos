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


import AsyncComponent from './routers/AsyncComponent';
const IndexAsync = AsyncComponent(() => import('./views/index'), ['app']);


const store = storeProvider.getStore();

class App extends React.Component {

  static contextTypes = { store: PropTypes.object };

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    // console.log('store', this.context)
  }
  componentWillUnmount() {
    // storeProvider.clearStore();
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