import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { Button, Input } from 'antd';


import AsyncLoader from '@/routers/AsyncLoader';
const UserInputAsync = AsyncLoader({ loader: () => import('./Input') });
const UserProfileAsync = AsyncLoader({ loader: () => import('./Profile') });


export default class User extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <p>这是 User</p>
                <p><Button type="primary">确定</Button></p>
                <p><Input /></p>
                <p><Link to="/user/input" >新增</Link></p>
                {/* <p><UserProfile /></p> */}

                <Switch>
                    <Route path="/user/input" exact={true} component={UserInputAsync} />
                    <Route exact={true} component={UserProfileAsync} />

                </Switch>
            </div>
        )
    }
};