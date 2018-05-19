import ImgExplore from '../../components/imgExplore';
import { connect} from 'react-redux';
import {isAdding } from '../../actions'
import WebAPI from '../../utils/WebAPI'
export default connect(

	(state)=>({
		imageresult:state.getIn(['search','imageResult']),
		page:state.getIn(['search','page']),
		preValue:state.getIn(['search','preValue']),
		searchtype:state.getIn(['input','searchType']),
		isAdding:state.getIn(['search','isAdding']),
		isInit:state.getIn(['search','isInit'])
	}),
	(dispatch)=>({
		firstResult:()=>{
			const valueList=['dog','cat','animals','black']
		     WebAPI.onSearch(dispatch,'image',valueList[Math.round(Math.random()*3)])
		},
		updateResult:(value,page)=>()=>{
			
			WebAPI.addResult(dispatch,'image',value,page)			
		},
		finishAdd:()=>dispatch(isAdding(false))

		}),
	(stateProps,dispatchProps,ownProps)=>{
		const {page,preValue} = stateProps;
		const {updateResult}=dispatchProps;
		
				return Object.assign({},stateProps,dispatchProps,ownProps,{
			updateResult:updateResult(preValue,page),
		})
	}
)(ImgExplore)
		