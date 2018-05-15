import axios from 'axios';

import {
	requestLogin,
	receiveUser,
	loginError,
	registerStart,
	registerSuccess,
	setAuth,
	registerFailed,
	requestData,
	getKey,
	addHistory,
	receiveData,
	cleanResult,
	setPage,
	setInput
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
					this.getResult(dispatch,'image','yellow')
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
	getSearchKey:(dispatch,value)=>{
		
        dispatch(requestData(true))
        axios.get('https://bird.ioliu.cn/v1?url=https://api.bing.com/qsonhs.aspx?type=cb&q='+value).then((res)=>{
        	
        	let data=res.data.AS;
        	    if(res){
        		  	dispatch(getKey(data.Results[0].Suggests))
        		  	dispatch(requestData(false))
        	 
             } 
	})},
	getResult:(dispatch,type,value,page)=>{
		dispatch(requestData(true))
		dispatch(addHistory(value))
		if(typeof(page)==='undefined'){
			dispatch(cleanResult())
		}
		var value=encodeURI(value.trim().replace(/\s+/ig,'+'))
		if(page){page='&pageToken='+page}else{page=''}
		if(type=='video'){
			axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&'+page+'q='+value+'&regionCode=US&relevanceLanguage=en&type=video&fields=items(id%2FvideoId%2Csnippet(description%2Ctitle))%2CnextPageToken&key=AIzaSyBH0BE8DjAhsgEFygiZLLBDWxzAiAiZpX4')
			.then((data)=>{
				dispatch(receiveData(data.items))
				dispatch(setPage(data.nextPageToken))
				
			})
		}
		else{
			axios.get('https://pixabay.com/api/?key=8956304-4d698e1be91b3c3961d70bffc&q='+value+'&image_type=photo&page='+page).then((data)=>{
				dispatch(receiveData(data.data.hits))
				dispatch(setPage(page+1))
				
			})
		}
		
	},



};