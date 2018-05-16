import React from 'react';
import ImgExplore from '../../components/imgExplore';
import { connect} from 'react-redux';
import faker from 'faker'
import WebAPI from '../../utils/WebAPI'
export default connect(

	(state)=>({
		imageresult:state.getIn(['search','imageResult']),
		videoresult:state.getIn(['search','videoResult']),
		page:state.getIn(['search','page']),
		preValue:state.getIn(['search','preValue']),
		searchtype:state.getIn(['input','searchtype'])
	}),
	(dispatch)=>({
		firstResult:(type)=>()=>{
		     WebAPI.onSearch(dispatch,type,faker.lorem.word())
		},
		updateResult:(type,value,page)=>()=>{
			
			WebAPI.addResult(dispatch,type,value,page)			
		}

		}),
	(stateProps,dispatchProps,ownProps)=>{
		const {page,preValue,searchtype} = stateProps;
		const {updateResult,firstResult}=dispatchProps;
		
				return Object.assign({},stateProps,dispatchProps,ownProps,{
			updateResult:updateResult(searchtype,preValue,page),
			firstResult:firstResult(searchtype)
		})
	}
)(ImgExplore)