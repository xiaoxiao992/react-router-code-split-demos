import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
// import UserProfile from './UserProfile';
import { Button, Input } from 'antd';
// import { UserInput } from '../routers';
import AsyncLoader from '@/routers/AsyncLoader';
const UserInputAsync = AsyncLoader({ loader: () => import('./Input') });
const UserProfileAsync = AsyncLoader({ loader: () => import('./Profile') });


// @DragLayer(monitor => ({
//     item: monitor.getItem(),
//     itemType: monitor.getItemType(),
//     initialOffset: monitor.getInitialSourceClientOffset(),
//     currentOffset: monitor.getSourceClientOffset(),
//     isDragging: monitor.isDragging(),
// }))
export default class User extends React.Component {

    constructor(props) {
        super(props);
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