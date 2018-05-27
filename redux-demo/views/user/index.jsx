import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Input, Table, Divider } from 'antd';
import actions from '../../actions/user';


import AsyncComponent from '@/routers/AsyncComponent';
const UserInputAsync = AsyncComponent(() => import('./Input'), ["app", "user"]);
const UserProfileAsync = AsyncComponent(() => import('./Profile'), ["app"]);

@connect(state => ({
    deleteStatus: {},//state.user.deleteStatus,
    // list: state.user.list,
    // loading: state.user.listLoading
}))
export default class User extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(actions.user.getList());
    }

    handleDelete = (id) => {
        const { dispatch } = this.props;
        dispatch(actions.user.deleteUser());

    }

    render() {
        const { deleteStatus, list, loading } = this.props;

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
        }, {
            title: '年龄',
            dataIndex: 'age',
        }, {
            title: '手机',
            dataIndex: 'mobile',
        }, {
            title: '地址',
            dataIndex: 'address',
        }, {
            title: '操作',
            // dataIndex: 'name',
            render: (text, record) => {
                return [
                    <Button href="javascript:;">编辑</Button>,
                    <Divider type="vertical" />,
                    <a href="javascript:;">删除</a>,
                    <Divider type="vertical" />,
                    <a href="javascript:;" className="ant-dropdown-link">
                        更多操作 <Icon type="down" />
                    </a>
                ]
            },
        }]

        return (
            <div>
                <p>这是 User</p>
                <p><Button type="primary" loading={deleteStatus[`1`]} icon={'delete'} onClick={() => { this.handleDelete(1) }}> </Button></p>
                <p><Button type="primary" loading={deleteStatus[`2`]} icon={'delete'} onClick={() => { this.handleDelete(2) }}></Button></p>


                <Table
                    rowKey={"id"}
                    loading={loading}
                    columns={columns}
                    pagination={false}
                    dataSource={list}
                />


                <p><Input /></p>
                <p><Link to="/user/input" >新增</Link></p>
                {/* <p><UserProfile /></p> */}

                <Switch>
                    <Route path="/user/input" exact={true} component={UserInputAsync} />
                    <Route exact={true} component={UserProfileAsync} />

                </Switch>
            </div >
        )
    }
};