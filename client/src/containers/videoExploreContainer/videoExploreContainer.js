
import VideoExplore from '../../components/videoExplore';
import { connect} from 'react-redux';
import {isAdding } from '../../actions'
import WebAPI from '../../utils/WebAPI'
import {withRouter} from 'react-router-dom'
export default connect(

	(state)=>({
		videoresult:state.getIn(['search','videoResult']),
		page:state.getIn(['search','page']),
		preValue:state.getIn(['search','preValue']),
		searchtype:state.getIn(['input','searchtype']),
		isInit:state.getIn(['search','isInit']),
		isAdding:state.getIn(['search','isAdding']),
		total:state.getIn(['input','total'])
	}),
	(dispatch)=>({
		firstResult:()=>{
			const valueList=['dog','cat','animals','black','music']
		     WebAPI.onSearch(dispatch,'video',valueList[Math.round(Math.random()*3)])
		},
		updateResult:(value)=>(page)=>{
			
			WebAPI.addResult(dispatch,'video',value,page)			
		},
		finishAdd:()=>dispatch(isAdding(false))

		

		}),
	(stateProps,dispatchProps,ownProps)=>{
		const {page,preValue} = stateProps;
		const {updateResult}=dispatchProps;
		
				return Object.assign({},stateProps,dispatchProps,ownProps,{
			updateResult:updateResult(preValue),
		})
	}
)(VideoExplore)
