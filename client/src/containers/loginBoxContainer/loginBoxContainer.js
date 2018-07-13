import { connect } from 'react-redux';
import LoginBox from '../../components/loginBox'

import {
	login,
	setInput,
	switchType,
} from '../../actions';
import WebAPI from '../../utils/WebAPI'
export default connect(
   (state)=>({
   	  email:state.getIn(['input','email']),
   	  password:state.getIn(['input','password']),
   	  username:state.getIn(['input','username']),
   	  avatar:state.getIn(['input','avatar']),
   	  isRegister:state.getIn(['user','isRegister']),
   	  isLoging:state.getIn(['user',"isLoging"]),
   	  authType:state.getIn(['user','switchType']),
        loginError:state.getIn(['user','loginError']),
        validateInfo:state.getIn(['input','validate']).toJS()
   }),
   (dispatch)=>({
   	  onChangeInput:(e,type)=>{
   	  	
   	  	  dispatch(setInput({key:type,value:e.target.value}))
   	  },
   	  onLoginSubmit:(email,password)=>()=>(
   	  	 dispatch(login(dispatch,email,password))
   	  	),
   	  onRegisterSubmit:(email,password,username)=>()=>{
   	  	return WebAPI.register(dispatch,{email:email,password:password,username:username})
   	  },
   	  onSwitchType:(type)=>()=>{
            dispatch(switchType(type))
         },
         validate:(user)=>()=>{
           return WebAPI.validate(dispatch,user)
         }
         
   }),
   	  (stateProps,dispatchProps,ownProps)=>{
   	  	 const {email,password,username}=stateProps;
   	  	 const { onLoginSubmit,onRegisterSubmit,validate }=dispatchProps;
   	  	 return Object.assign({},stateProps,dispatchProps,ownProps,{
   	  	 	onLoginSubmit:onLoginSubmit(email,password),
   	  	 	onRegisterSubmit:onRegisterSubmit(email,password,username),
            validate:validate({username:username,email:email,password:password})
   	  	 })
   	  }
)(LoginBox)