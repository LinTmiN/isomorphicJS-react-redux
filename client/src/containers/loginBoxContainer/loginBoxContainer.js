import React from 'react';
import { connect } from 'react-redux';
import LoginBox from '../../components/LoginBox'
import {
	login,
	register,
	setInput,
} from '../../actions'
export default connect(
   (state)=>({
   	  email:state.getIn(['input','email']),
   	  password:state.getIn(['input','password']),
   	  username:state.getIn(['input','username']),
   	  avatar:state.getIn(['input','avatar']),
   	  isRegister:state.getIn(['user','isRegister']),
   	  isLoging:state.getIn(['user',"isLoging"]),
   	  
   }),
   (dispatch)=>({
   	  onChangeInput:(event)=>{
   	  	const key=event.target.placeholder.split(' ')[1].toLowerCase()
   	  	  dispatch(setInput({key:key,value:event.target.value}))
   	  },
   	  onLoginSubmit:(email,password)=>(
   	  	 dispatch(login(dispatch,email,password))
   	  	),
   	  onRegisterSubmit:(email,password,avatar,username)=>{
   	  	 dispatch(register(dispatch,{email:email,password:password,avatar:avatar,username:username}))
   	  },
   }),
   	  (stateProps,dispatchProps,ownProps)=>{
   	  	 const {email,password,avatar,username,authType}=stateProps;
   	  	 const { onLoginSubmit,onRegisterSubmit,onSwitchType }=dispatchProps;
   	  	 return Object.assign({},stateProps,ownProps,{
   	  	 	onLoginSubmit:onLoginSubmit(email,password),
   	  	 	onRegisterSubmit:onRegisterSubmit(email,password,avatar,username),
   	  	 })
   	  }
)(LoginBox)