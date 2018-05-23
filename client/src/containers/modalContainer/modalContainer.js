import {connect } from 'react-redux'
import Modal from '../../components/modal'
import {withRouter } from 'react-router-dom'
export default withRouter(connect(
	(state)=>({
		isCardInit:state.getIn(['search','isCardInit'])
	})
)(Modal))