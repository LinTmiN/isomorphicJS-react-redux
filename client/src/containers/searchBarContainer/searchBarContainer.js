import { connect } from 'react-redux';
import SearchBar from '../../components/searchBar';
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
		searchtype:state.getIn(['input','searchtype']),
		searchvalue:state.getIn(['input','searchvalue']),
		resultsShow:state.getIn(['search','resultsShow'])
	}),
	(dispatch)=>({
		onTypeChange:(event,{value})=>{
			console.log('change'+value)
			dispatch(setInput({key:'searchtype',value:value}))			
			
		},
		onSearchChange:(event,{value})=>{			
		    dispatch(toggleResults(true))
			dispatch(setInput({key:'searchvalue',value:value}))
			if(value===''){dispatch(toggleResults(false))
				return}
			dispatch(inputSearch(dispatch,value))
		},
		onConfirmSearch:(type)=>(result,history)=>{
			//点击提示框把结果传进去
			
			dispatch(setInput({key:'searchvalue',value:result.title}))

			WebAPI.onSearch(dispatch,type,result.title)
			dispatch(toggleResults(false))
			history.push('/search/'+type)

		},
		onBlur:()=>{
			dispatch(requestData(false))
			setTimeout(()=>{dispatch(toggleResults(false))},200)
			
		},
		onPressEnter:(type,value)=>(e,history)=>{
			
			 if(e.keyCode===13){
			 	WebAPI.onSearch(dispatch,type,value)
			 	dispatch(toggleResults(false))
			 	history.push('/search/'+type)
			 }
		},
		initType:(type)=>dispatch(setInput({key:'searchtype',value:type}))
		
	}),
	  (stateProps,dispatchProps,ownProps)=>{
	  	   const { searchtype,searchvalue} = stateProps;
	  	   const { onConfirmSearch ,onPressEnter} = dispatchProps;
	  	  
	  	   return Object.assign({},stateProps,dispatchProps,ownProps,{
	  	   	    onConfirmSearch:onConfirmSearch(searchtype),
	  	   	    onPressEnter:onPressEnter(searchtype,searchvalue),
	  	   	    
	  	   })
	  }

)(SearchBar))