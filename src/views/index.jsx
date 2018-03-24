import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import AsyncLoader from '../routers/AsyncLoader';
const AsyncUser = AsyncLoader({ loader: () => import('./user') });
const AsyncSortable = AsyncLoader({ loader: () => import('./Sortable') });

export default class Index extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div>这是Indexd</div>
                <br />
                <Link to="/user" >User</Link>
                <br />
                <Link to="/dnd">DND</Link>
                <Switch>
                    <Route path="/dnd" exact={false} component={AsyncSortable} />
                    <Route path="/user" exact={false} component={AsyncUser} />
                </Switch>
            </div >
        )
    }
};