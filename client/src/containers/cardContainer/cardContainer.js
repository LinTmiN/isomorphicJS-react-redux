import {connect} from 'react-redux'
import Card from '../../components/card'
import WebAPI from '../../utils/WebAPI'

import {isCardInit} from '../../actions'
export default connect(
	(state)=>({
		imageresult:state.getIn(['search','imageResult']),
		videoresult:state.getIn(['search','videoResult']),
		page:state.getIn(['search','page']),
		preValue:state.getIn(['search','preValue']),
		isCardInit:state.getIn(['search','isCardInit']),
		collect:state.getIn(['user','collect']),
		screen:state.getIn(['input','screen']),
		userInfo:state.getIn(['user','userInfo']).toJS(),
	}),
	(dispatch)=>({
		updateResult:(value,page)=>(type)=>{
			WebAPI.addResult(dispatch,type,value,page)
		},
		
		onCardInit:()=>dispatch(isCardInit(true)),
		addCollect:(newcollect)=>()=>{
			 WebAPI.addCollect(dispatch,newcollect)
		},
		deleteCollect:(collectId)=>()=>{
			WebAPI.deleteCollect(dispatch,collectId)
		},
		getCollect:()=>{
			return WebAPI.getCollect(dispatch)
		}
	}),
	(stateProps,dispatchProps,ownProps)=>{
		const { preValue,page} =stateProps;
		const {updateResult}=dispatchProps
		
		return Object.assign({},stateProps,dispatchProps,ownProps,{
			updateResult:updateResult(preValue,page)
		})
	}
)(Card)