import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import { getEmptyImage } from 'react-dnd-html5-backend'

const style = {
    border: '1px dashed gray',
    padding: '4.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
    transition: 'all 1s linear'
}

const cardSource = {
    beginDrag(props, monitor, component) {
        // console.log('beginDrag', component);
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        console.log('beginDrag', hoverBoundingRect);
        // 返回当前拖拽对象的信息；
        // 这里return的数据将被用在 moniter.getItem();
        return {
            id: props.id,
            index: props.index,
            title: props.text,
            width: hoverBoundingRect.width,
            height: hoverBoundingRect.height,
            left: hoverBoundingRect.left,
            top: hoverBoundingRect.top
        }
    },
    // isDragging() {
    //     console.log("isDragging");
    // }
    endDrag(props, monitor, component) {
        console.log("endDrag", component);
    }
}

const cardTarget = {
    // drop(props, monitor, component) {
    //     console.log("cardTarget", 'drop');
    //     const element = findDOMNode(component);
    //     element.style.transform = "translate(0,0)";
    //     element.style.transition = 'translate 0s linear';
    // },
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return
        }

        // const element = findDOMNode(component);


        // Determine rectangle on screen 当前目标的位置
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) * .8;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset(); // 当前鼠标的位置；
        // const initialClientOffset = monitor.getInitialClientOffset();
        // const sourceClientOffset = monitor.getSourceClientOffset();
        // const differenceFromInitialOffset = monitor.getDifferenceFromInitialOffset();

        // console.log("cardTarget", dragIndex, hoverIndex, clientOffset, hoverBoundingRect, sourceClientOffset, monitor.getInitialClientOffset());

        const translateY = Math.abs(hoverBoundingRect.y - clientOffset.y) - ((dragIndex > hoverIndex) ? hoverBoundingRect.height : 0);

        // console.log('translateY', translateY, hoverBoundingRect.y, clientOffset.y, hoverBoundingRect.height)

        // element.style.transition = 'translate 10s linear';
        // element.style.transform = `translate(0,${-translateY}px)`;
        // element.style.backgroundColor = "gray"
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        // element.style.transform = `translate(0,0)`;
        // element.style.transition = 'translate 0s linear';
        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex)


        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex
    },
}

@DropTarget(ItemTypes.CARD, cardTarget, (connect, monitor) => ({
    // connectDropTarget: connect.dropTarget(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    draggingColor: monitor.getItemType(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
}))
export default class Card extends Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        id: PropTypes.any.isRequired,
        text: PropTypes.string.isRequired,
        moveCard: PropTypes.func.isRequired,
    }

    componentDidMount() {
        // Use empty image as a drag preview so browsers don't draw it
        // and we can draw whatever we want on the custom drag layer instead.
        // console.log('dddd', getEmptyImage())
        this.props.connectDragPreview(getEmptyImage(), {
            // IE fallback: specify that we'd rather screenshot the node
            // when it already knows it's being dragged so we can hide it with CSS.
            captureDraggingState: true,
        })
    }

    render() {
        const {
            text,
            isDragging,
            connectDragSource,
            connectDropTarget,
            isOver,
            id,
        } = this.props
        const opacity = isDragging ? 0 : 1;

        console.log('isDragging', isDragging);
        // style.transform = "translate(0,0)";
        // if (!isOver) {
        //     // style.transform = "translate(0,0)"
        // }

        // if (isOver) {
        //     style.transform = isOver === true ? 'translate(0,0)' : "translate(0,0)"
        // }
        // const m = { transform: (isOver && isOver === true) ? null : "translate(0,0)" }

        // console.log('this.ssss', isOver, isOver === true, this.props);

        return connectDragSource(
            connectDropTarget(<div data={id} style={{ ...style, opacity }}>{text}</div>),
        )
    }
}