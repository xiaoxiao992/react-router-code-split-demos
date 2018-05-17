import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import AsyncLoader from '../routers/AsyncLoader';
// import HTML5Backend from 'react-dnd-html5-backend';
// import { DragDropContextProvider } from 'react-dnd';
const UserAsync = AsyncLoader({ loader: () => import('./user') });


export default class HomeIndex extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {

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