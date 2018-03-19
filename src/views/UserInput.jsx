import React from 'react';
import { Button, Upload } from 'antd';

export default class UserInput extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <Upload /> ,
            <div>UserInput <Button type="promary">确认</Button></div>
        )
    }
};