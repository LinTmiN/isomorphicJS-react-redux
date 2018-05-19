import { connect } from 'react-redux';
import SwitchC from '../../components/switchC'

export default connect(
	(state)=>({
	isAuthorized:state.getIn(['user','isAuthorized'])
}),
)(SwitchC)