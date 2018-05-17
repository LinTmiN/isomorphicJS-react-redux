import React from 'react';
import { connect } from 'react-redux';
import SearchBar from '../../components/searchBar';
import faker from 'faker'
import { withRouter} from 'react-router-dom' 
import {
	inputSearch,
	setInput,
	toggleResults,
	requestData
} from '../../actions'
import WebAPI from '../../utils/WebAPI'
export default withRouter(connect(

	(state)=>({
		issearching:state.getIn(['search','isSearching']),
		searchKey:state.getIn(['search','key']),
		searchtype:state.getIn(['input','searchType']),
		searchvalue:state.getIn(['input','searchvalue']),
		resultsShow:state.getIn(['search','resultsShow'])
	}),
	(dispatch)=>({
		onTypeChange:(event,{value})=>{
			console.log('change'+value)
			dispatch(setInput({key:'searchType',value:value}))			
			
		},
		onSearchChange:(event,{value})=>{			
		    dispatch(toggleResults(true))
			dispatch(setInput({key:'searchvalue',value:value}))
			if(value===''){dispatch(toggleResults(false))
				return}
			dispatch(inputSearch(dispatch,value))
		},
		onConfirmSearch:(type)=>(e,{result})=>{
			//点击提示框把结果传进去
			console.log('serchTypeis'+type)
			dispatch(setInput({key:'searchvalue',value:result.title}))

			WebAPI.onSearch(dispatch,type,result.title)
			dispatch(toggleResults(false))
		},
		onBlur:()=>{
			dispatch(requestData(false))
			setTimeout(()=>{dispatch(toggleResults(false))},200)
			
		},
		onPressEnter:(type,value)=>(e)=>{
			console.log('serchTypeis'+type)
			 if(e.keyCode===13){
			 	WebAPI.onSearch(dispatch,type,value)
			 	dispatch(toggleResults(false))
			 }
		}
		
	}),
	  (stateProps,dispatchProps,ownProps)=>{
	  	   const { searchtype,searchvalue} = stateProps;
	  	   const { onConfirmSearch ,onPressEnter,onTypeChange} = dispatchProps;
	  	  
	  	   return Object.assign({},stateProps,dispatchProps,ownProps,{
	  	   	    onConfirmSearch:onConfirmSearch(searchtype),
	  	   	    onPressEnter:onPressEnter(searchtype,searchvalue),
	  	   	    
	  	   })
	  }

)(SearchBar))