import { connect } from 'react-redux';
import LoginBox from '../../components/loginBox'
import {
	login,
	register,
	setInput,
	switchType,
} from '../../actions'
export default connect(
   (state)=>({
   	  email:state.getIn(['input','email']),
   	  password:state.getIn(['input','password']),
   	  username:state.getIn(['input','username']),
   	  avatar:state.getIn(['input','avatar']),
   	  isRegister:state.getIn(['user','isRegister']),
   	  isLoging:state.getIn(['user',"isLoging"]),
   	  authType:state.getIn(['user','switchType']),
        loginError:state.getIn(['user','loginError'])
   }),
   (dispatch)=>({
   	  onChangeInput:(event)=>{
   	  	const key=event.target.placeholder.split(' ')[1].toLowerCase()
   	  	  dispatch(setInput({key:key,value:event.target.value}))
   	  },
   	  onLoginSubmit:(email,password)=>()=>(
   	  	 dispatch(login(dispatch,email,password))
   	  	),
   	  onRegisterSubmit:(email,password,avatar,username)=>()=>{
   	  	 dispatch(register(dispatch,{email:email,password:password,avatar:avatar,username:username}))
   	  },
   	  onSwitchType:(type)=>()=>{
         dispatch(switchType(type))
         }
   }),
   	  (stateProps,dispatchProps,ownProps)=>{
   	  	 const {email,password,avatar,username}=stateProps;
   	  	 const { onLoginSubmit,onRegisterSubmit }=dispatchProps;
   	  	 return Object.assign({},stateProps,dispatchProps,ownProps,{
   	  	 	onLoginSubmit:onLoginSubmit(email,password),
   	  	 	onRegisterSubmit:onRegisterSubmit(email,password,avatar,username),
   	  	 })
   	  }
)(LoginBox)