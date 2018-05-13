import axios from 'axios';
import {
	requestLogin,
	receiveUser,
	loginError,
	registerStart,
	registerSuccess,
	setAuth,
	registerFailed,
} from '../actions';

function getCookie(keyName){
	var name=keyName+'=';
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
		console.log('login '+email+password)
		axios.post('api/login',{
			email:email,
			password:password
		}).then((res)=>{
			if(res.data.success === false){
				dispatch(loginError())
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
	checkAuth:(dispatch,token)=>{
		axios.post('api/authenicate',{
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
		console.log('reg '+user)
		dispatch(registerStart())
		axios.post('api/register',user).then((res)=>{
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