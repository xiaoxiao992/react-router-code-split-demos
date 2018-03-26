import React, { Component } from 'react'
import Container from './Container';
import CustomDragLayer from '../CustomDragLayer/CustomDragLayer';

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
                {/* <p>
                    <b>
                        <a href="https://github.com/react-dnd/react-dnd/tree/master/packages/documentation/examples/04%20Sortable/Simple">
                            Browse the Source
						</a>
                    </b>
                </p> */}
                <p>
                    It is easy to implement a sortable interface with React DnD. Just make
					the same component both a drag source and a drop target, and reorder
					the data in the <code>hover</code> handler.
				</p>
                <Container />
                <CustomDragLayer snapToGrid={false} />
                {/* <CustomDragLayer snapToGrid={snapToGridWhileDragging} /> */}
            </div>
        )
    }
}