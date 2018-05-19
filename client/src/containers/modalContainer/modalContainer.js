import {connect } from 'react-redux'
import Modal from '../../components/modal'
export default connect(
	(state)=>({
		isCardInit:state.getIn(['search','isCardInit'])
	})
)(Modal)