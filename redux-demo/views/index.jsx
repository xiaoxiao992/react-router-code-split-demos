import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
// import { createAction, createActions } from 'redux-actions';
import actions from '../actions/app';
import storeProvider from '../utils/storeProvider'

import AsyncComponent from '../routers/AsyncComponent';

// import HTML5Backend from 'react-dnd-html5-backend';
// import { DragDropContextProvider } from 'react-dnd';

const UserAsync = AsyncComponent(() => import('./user'), ["app"]);

class HomeIndex extends React.Component {

  static contextTypes = {
    store: PropTypes.object
  };

  // static contextTypes = {
  //   store: PropTypes.object
  // };

  constructor(props) {
    super(props);

  }

  handleDelete = (id) => {



  }

  componentDidMount() {
    const { dispatch } = this.props;
    console.log("context", this.context.store === storeProvider.getStore());
    // this.props.dispatch(actions.user.getList());
    dispatch(actions.app.getAppInfo());

  }

  render() {
    const { deleteStatus } = this.props;
    return (
      <div>
        <p>这是 {} </p>
        <p> <Link to="/user" >User</Link></p>

        <Switch>
          <Route path="/user" exact={false} component={UserAsync} />
        </Switch>
      </div>
    )
  }
};

export default connect(state => {
  console.log(state);
  return {
    // user: state.user,
    // appInfo: state.app.appInfo || {}
    appInfo: {}
  }
})(HomeIndex);