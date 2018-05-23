import { connect } from 'react-redux';
import SwitchC from '../../components/switchC'
import WebAPI from '../../utils/WebAPI'
import {getScreen} from '../../actions'
export default connect(
	(state)=>({
	isAuthorized:state.getIn(['user','isAuthorized']),
	isCheck:state.getIn(['user','isCheck'])
	})
	,
	(dispatch)=>({
		checkAuthor:()=>{
			WebAPI.checkAuthor(dispatch)
		},
		getScreen:()=>{
			let width=document.body.clientWidth||document.documentElement.clientWidth,
			    height=document.body.clientHeight||document.documentElement.clientHeight;
			    dispatch(getScreen({width:width,
			    	height:height}))
		}
	})
,
)(SwitchC)