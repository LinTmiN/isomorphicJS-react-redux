import axios from 'axios';
import {
	requestLogin,
	receiveUser,
	loginError,
	registerStart,
	registerSuccess,
	chekAuth,
	setAuth,
	registerFailed,
} from '../actions';

function getCookie(ketName){
	var name=KeyName+'=';
	const cookies = document.cookie.split(';');
	for (let i=0;i<cookies.length;i++){
		let cookie =cookies[i].trim();
		if(cookie.indexOf(name)==0){
			return cookie.substring(name.length,cookie.length)
		}
	}
	return '';
}
export default {
	login:(dispatch,email,password)=>{
		dispatch(requestLogin())
		axios.post('/api/login',{
			email:email,
			password:password
		}).then((res)=>{
			if(res.data.success === false){
				dispatch(loginError())
				alert(res.data.message?response.data.message:'发生错误，再次请求')
				window.location.reload();
			}else{
				if(!document.cookie.token){
					let d = new Date();
					d.setTime(d.getTime()+(24*60*60*1000));
					const expires = 'expires='+d.toUTCString();
					document.cookie = 'token='+res.data.token+';'+expires;
					dispatch(receiveUser(res.data.user))
					dispatch(setAuth({value:true}))
				}
			}
			
		})
		.catch(function(error){
			dispatch(loginError())
		})
	},
	logout:(dispatch)=>{
		document.cookie ='token=;'+'expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		dispatch(setAuth({value:false}))
	},
	checkauth:(dispatch,token)=>{
		axios.post('/api/authenicate',{
			token:token
		})
		.then((res)=>{
			if(res.data.success===false){
				dispatch(setAuth({value:false}))
			}else{
				dispatch(setAuth({value:true}))
			}
		})
		.catch((err)=>{
			dispatch(loginError())
		})
	},
	register:(dispatch,user)=>{
		dispatch(registerStart())
		axios.post('/api/register',user).then((res)=>{
			if(res.data.success===false){
				dispatch(registerFailed())
			}else{
				this.login(dispatch,res.data.user.email,res.data.user.password)
			}
		})
		.catch((err)=>{
			dispatch(registerFailed())
		})
	},

};