import React, { Component } from 'react'
import PropTypes from 'prop-types'
import shouldPureComponentUpdate from './shouldPureComponentUpdate'
import Box from './Box'

const styles = {
	display: 'inline-block',
	// transform: 'rotate(-7deg)',
	// WebkitTransform: 'rotate(-7deg)',
}

export default class BoxDragPreview extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
	}

	shouldComponentUpdate = shouldPureComponentUpdate

	constructor(props) {
		super(props)
		this.tick = this.tick.bind(this)
		this.state = {
			tickTock: false,
		}
	}

	componentDidMount() {
		this.interval = setInterval(this.tick, 500)
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	tick() {
		this.setState({
			tickTock: !this.state.tickTock,
		})
	}

	render() {
		const { title ,item:{width,height}} = this.props
		const { tickTock } = this.state;
		const doc= {width,height};

		return (
			<div style={styles}>
				<Box {...doc} title={title} yellow={tickTock} />
			</div>
		)
	}
}
