import {connect } from 'react-redux'
import Modal from '../../components/modal'
import {withRouter } from 'react-router-dom'
import { isCardInit } from '../../actions'
export default withRouter(connect(
	(state)=>({
		isCardInit:state.getIn(['search','isCardInit'])
	}),
	(dispatch)=>({
		CardInit:()=>{
			dispatch(isCardInit(false))
		}
	})
)(Modal))