import {connect} from 'react-redux'
import CollectExplore from '../../components/collectExplore'
import WebAPI from '../../utils/WebAPI'
export default connect(
  (state)=>({
  	collect:state.getIn(['user','collect'])
  })
  ,
  (dispatch)=>({
  	getCollect:()=>{
  		return WebAPI.getCollect(dispatch)
  	}
  })
)(CollectExplore)