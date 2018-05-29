import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Input, Table, Divider, Spin } from 'antd';
import actions from '../../actions/user';


import AsyncComponent from '@/routers/AsyncComponent';
const UserInputAsync = AsyncComponent(() => import('./Input'), ["app", "user"]);
const UserProfileAsync = AsyncComponent(() => import('./Profile'), ["app"]);

@connect((state = { user: {} }) => {
    // console.log('User', state);
    return {
        // deleteStatus: {}
        deleteStatus: state.user.deleteStatus,
        list: state.user.list,
        loading: state.user.listLoading
    }
})
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
        // console.log('handleDelete', id);
        dispatch(actions.user.deleteUser(id));

    }

    render() {
        const { deleteStatus, list, loading } = this.props;
        console.log('deleteStatus', deleteStatus)
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

                const loading = deleteStatus[record.id] === true;
                // console.log(typeof loading)
                return [
                    <Button key="0" href="javascript:;">编辑</Button>,
                    <Divider key="1" type="vertical" />,

                    // <Spin key='2' spinning={loading} >
                    <a key="2" href="javascript:;" disabled={loading} onClick={() => { loading ? undefined : this.handleDelete(record.id) }}>删除</a>
                    // </Spin>
                    ,
                    <Divider key="3" type="vertical" />,
                    <a key="4" href="javascript:;" className="ant-dropdown-link">
                        更多操作
                    </a>
                ]
            },
        }]

        return (
            <div>
                <p>这是 User</p>
                {/* <p><Button type="primary" loading={deleteStatus[`1`]} icon={'delete'} onClick={() => { this.handleDelete(1) }}> </Button></p>
                <p><Button type="primary" loading={deleteStatus[`2`]} icon={'delete'} onClick={() => { this.handleDelete(2) }}></Button></p> */}
                {/* <Icon type="user" /> */}

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