import {connect} from 'react-redux'
import Card from '../../components/card'
import WebAPI from '../../utils/WebAPI'
import axios from 'axios'
import {isCardInit} from '../../actions'
export default connect(
	(state)=>({
		imageresult:state.getIn(['search','imageResult']),
		videoresult:state.getIn(['search','videoResult']),
		page:state.getIn(['search','page']),
		preValue:state.getIn(['search','preValue']),
		isCardInit:state.getIn(['search','isCardInit']),
		collect:state.getIn(['user','collect']),
		screen:state.getIn(['input','screen'])
	}),
	(dispatch)=>({
		updateResult:(value,page)=>(type)=>{
			WebAPI.addResult(dispatch,type,value,page)
		},
		getComment:(videoId,page)=>axios.get('https://api.vimeo.com/videos/'+videoId+'/comments?page='+page+'&access_token=bff4a0260496cc72b64158bc0670c01a&per_page=25'),
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