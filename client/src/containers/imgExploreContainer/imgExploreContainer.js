import React from 'react';
import ImgExplore from '../../components/imgExplore';
import { connect} from 'react-redux';
import {

	confirmSearch
} from '../../actions'
export default connect(

	(state)=>({
		results:state.getIn(['search','result'])
	}),
	(dispatch)=>({
		firstResult:()=>{
		     dispatch(confirmSearch(dispatch,'image','yellow'))
		}
	})
)(ImgExplore)