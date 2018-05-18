// import { b } from './test';
import b from './b';
// import 'antd/dist/antd.less';
import 'antd/es/style/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
// import Loadable from 'react-loadable';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
// E:\githubs\react-router-code-split-demo\node_modules\antd\es\style\index.less
import './app.css';
import './app.less';
// import {
//     Index, User
// } from "./routers";
import AsyncLoader from './routers/AsyncLoader';

const AsyncIndex = AsyncLoader({ loader: () => import('./views/index') });

class App extends React.Component {

    constructor(props) {
        super(props);
        console.log(b);
    }

    componentDidMount() {

    }

    render() {
        return (
            <Router>
                <Switch>
                    {/* <Route path="/user" exact={false} component={AsyncUser} /> */}
                    <Route path="/" exact={false} component={AsyncIndex} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        );
    }
};

ReactDOM.render(<App />, document.getElementById("root"));