import { connect } from 'react-redux';
import SearchBar from '../../components/searchBar';
import { withRouter} from 'react-router-dom' 
import {
	inputSearch,
	toggleResults,
	requestData
} from '../../actions'
import WebAPI from '../../utils/WebAPI'
export default withRouter(connect(

	(state)=>({
		issearching:state.getIn(['search','isSearching']),
		searchKey:state.getIn(['search','key']),
		resultsShow:state.getIn(['search','resultsShow'])
	}),
	(dispatch)=>({
		onSearchChange:(value)=>{			
		    dispatch(toggleResults(true))
			if(value===''){dispatch(toggleResults(false))
				return}
			dispatch(inputSearch(dispatch,value))
		},
		onConfirmSearch:(type,value)=>{
			//点击提示框把结果传进去
			WebAPI.onSearch(dispatch,type,value)
			dispatch(toggleResults(false))
			window.scrollTo(0, 0)

		},
		onBlur:()=>{
			dispatch(requestData(false))
			setTimeout(()=>{dispatch(toggleResults(false))},200)
			
		},
		onPressEnter:(type,value)=>{
			 	WebAPI.onSearch(dispatch,type,value)
			 	dispatch(toggleResults(false))
			 	
			 	window.scrollTo(0, 0)
			 }
		,
		
	})
)(SearchBar))