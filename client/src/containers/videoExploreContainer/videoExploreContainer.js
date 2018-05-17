import React from 'react';
import VideoExplore from '../../components/videoExplore';
import { connect} from 'react-redux';
import faker from 'faker';
import {isAdding } from '../../actions'
import WebAPI from '../../utils/WebAPI'
export default connect(

	(state)=>({
		videoresult:state.getIn(['search','videoResult']),
		page:state.getIn(['search','page']),
		preValue:state.getIn(['search','preValue']),
		searchtype:state.getIn(['input','searchType']),
		isInit:state.getIn(['search','isInit']),
		isAdding:state.getIn(['search','isAdding']),
	}),
	(dispatch)=>({
		firstResult:()=>{
			const valueList=['dog','cat','animals','black']
		     WebAPI.onSearch(dispatch,'video',valueList[Math.round(Math.random()*3)])
		},
		updateResult:(value,page)=>()=>{
			console.log(value)
			WebAPI.addResult(dispatch,'video',value,page)			
		},
		finishAdd:()=>dispatch(isAdding(false))

		

		}),
	(stateProps,dispatchProps,ownProps)=>{
		const {page,preValue} = stateProps;
		const {updateResult,firstResult}=dispatchProps;
		
				return Object.assign({},stateProps,dispatchProps,ownProps,{
			updateResult:updateResult(preValue,page),
		})
	}
)(VideoExplore)
