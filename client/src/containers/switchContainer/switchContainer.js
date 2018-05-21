import { connect } from 'react-redux';
import SwitchC from '../../components/switchC'
import WebAPI from '../../utils/WebAPI'
export default connect(
	(state)=>({
	isAuthorized:state.getIn(['user','isAuthorized']),
	isCheck:state.getIn(['user','isCheck'])
	})
	,
	(dispatch)=>({
		checkAuthor:()=>{
			WebAPI.checkAuthor(dispatch)
		}
	})
,
)(SwitchC)