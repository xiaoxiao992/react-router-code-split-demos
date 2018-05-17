import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import AsyncLoader from '../routers/AsyncLoader';
// import HTML5Backend from 'react-dnd-html5-backend';
// import { DragDropContextProvider } from 'react-dnd';
const UserAsync = AsyncLoader({ loader: () => import('./user') });

class HomeIndex extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { dispatch, actions } = this.props;
    const params = { name: 'sds' };
    dispatch(actions.fetchUser(params))
    // this.props.dispatch({ type: "user/list" });
  }

  render() {
    return (
      <div>
        <p>这是 Index </p>
        <p> <Link to="/user" >User</Link></p>

        <Switch>
          <Route path="/user" exact={false} component={UserAsync} />
        </Switch>
      </div>
    )
  }
};

export default connect(state => ({
  user: state.user
}))(HomeIndex);