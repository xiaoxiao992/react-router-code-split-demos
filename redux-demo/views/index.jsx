import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../api';
// import { createAction, createActions } from 'redux-actions';
import actions from '../actions/user';

import AsyncLoader from '../routers/AsyncLoader';
import { Button } from 'antd';
// import HTML5Backend from 'react-dnd-html5-backend';
// import { DragDropContextProvider } from 'react-dnd';
const UserAsync = AsyncLoader({ loader: () => import('./user') });

class HomeIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  handleDelete = (id) => {

    this.props.dispatch(actions.user.deleteUser(id));

  }

  componentDidMount() {
    const { dispatch } = this.props;
    const params = { name: 'sds' };

    this.props.dispatch(actions.user.getList());

  }

  render() {
    const { deleteStatus } = this.props;
    return (
      <div>
        <p>这是 Index </p>
        <p> <Link to="/user" >User</Link></p>
        <p><Button type="primary" loading={deleteStatus[`1`]} icon={'delete'} onClick={() => { this.handleDelete(1) }}> </Button></p>
        <p><Button type="primary" loading={deleteStatus[`2`]} icon={'delete'} onClick={() => { this.handleDelete(2) }}></Button></p>
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
    deleteStatus: state.deleteStatus || {}
  }
})(HomeIndex);