import ImgExplore from '../../components/imgExplore';
import { connect} from 'react-redux';
import {isAdding } from '../../actions'
import WebAPI from '../../utils/WebAPI'
import axios from 'axios'
import {isInit,initResult,preValue,setPage,setInput}  from '../../actions';
export default connect(

	(state)=>({
		imageresult:state.getIn(['search','imageResult']),
		page:state.getIn(['search','page']),
		preValue:state.getIn(['search','preValue']),
		searchtype:state.getIn(['input','searchtype']),
		isInit:state.getIn(['search','isInit']),
		total:state.getIn(['input','total']),
		isAdding:state.getIn(['search','isAdding']),
	}),
	(dispatch)=>({
		firstResult:()=>{
			dispatch(isInit(true))
			axios.get('https://api.unsplash.com/photos?page=1&per_page=24&order_by=popular&client_id=8e49ffe791fa753b1d76486427f9f2020b38e6599079c929a49b5ac197767992')
			.then(({data})=>{
				dispatch(initResult({key:'imageResult',value:data}))
				dispatch(preValue('rementupian'))
				dispatch(setPage(2))
				dispatch(isInit(false))
				dispatch(setInput({key:'total',value:Number.POSITIVE_INFINITY}))
			})
		},
		updateResult:(value)=>(page)=>{
			
			WebAPI.addResult(dispatch,'image',value,page)			
		},
		finishAdd:()=>dispatch(isAdding(false))

		}),
	(stateProps,dispatchProps,ownProps)=>{
		const {preValue} = stateProps;
		const {updateResult}=dispatchProps;
		
				return Object.assign({},stateProps,dispatchProps,ownProps,{
			updateResult:updateResult(preValue),
		})
	}
)(ImgExplore)
		