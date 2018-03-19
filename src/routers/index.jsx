// import "@/assets/sass/console.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Bundle from './Bundle';
// 按需加载模块
import _Index from 'bundle-loader?lazy!../views/index';
import _User from 'bundle-loader?lazy!../views/user';
// import _UserInput from 'bundle-loader?lazy!../views/UserInput';

export const Index = (props) => (<Bundle load={_Index}>{(Component) => <Component {...props} />}</Bundle>);
export const User = (props) => (<Bundle load={_User}>{(Component) => <Component {...props} />}</Bundle>);
// export const UserInput = (props) => (<Bundle load={_UserInput}>{(Component) => <Component {...props} />}</Bundle>);