import { Button, Input } from 'antd';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
// import { UserInput } from '../routers';
import AsyncLoader from '../routers/AsyncLoader';
import UserProfile from './UserProfile';
const UserInputAsync = AsyncLoader({ loader: () => import('./UserInput') });

export default class User extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p>这是User</p>
                <p><Button type="primary">确定</Button></p>
                <p> <Input /></p>
                <p><Link to="/user/input" >新增</Link></p>

                <UserProfile />
                <Switch>
                    <Route path="/user/input" exact={true} component={UserInputAsync} />
                </Switch>
            </div >
        )
    }
};