import shallowEqual from './shallowEqual'

export default function shouldPureComponentUpdate(nextProps, nextState) {
	// console.log('nextProps, nextState',nextProps, nextState)
	return (
		!shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
	)
}
