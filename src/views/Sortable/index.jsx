import React, { Component } from 'react'
import Container from './Container';
// import CustomDragLayer from '../CustomDragLayer/CustomDragLayer';
import CardDragLayer from './CardDragLayer';

export default class SortableSimple extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     snapToGridAfterDrop: false,
        //     snapToGridWhileDragging: false,
        // }
    }

    render() {
        // const { snapToGridAfterDrop, snapToGridWhileDragging } = this.state
        return (
            <div>
                <Container />
                {/* <CustomDragLayer snapToGrid={false} /> */}
                <CardDragLayer />
                {/* <CustomDragLayer snapToGrid={snapToGridWhileDragging} /> */}
            </div>
        )
    }
}