import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import UserProfile from './UserProfile';
// import { UserInput } from '../routers';

export default class User extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div>这是User
                <Link to="/user/input" >新增</Link>
                <UserProfile />
                {/* <Switch>
                    <Route path="/user/input" exact={true} component={UserInput} />
                </Switch> */}
            </div>
        )
    }
};