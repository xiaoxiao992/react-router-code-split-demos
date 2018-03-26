import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import UserProfile from './UserProfile';
import { Button, Input } from 'antd';
// import { UserInput } from '../routers';
import AsyncLoader from '../routers/AsyncLoader';
const AsyncUserInput = AsyncLoader({ loader: () => import('./UserInput') });



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
            <div>这是User
                <Button type="primary">确定00990</Button>
                <Input />
                <Link to="/user/input" >新增</Link>
                <UserProfile />
                <Switch>
                    <Route path="/user/input" exact={true} component={AsyncUserInput} />
                </Switch>
            </div>
        )
    }
};