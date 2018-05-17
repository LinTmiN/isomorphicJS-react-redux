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
	setPage,
	setInput,
	preValue,initResult,addResult,isAdding,isInit
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
        	console.log(data)
        	    if(res){
        		  	dispatch(getKey(data.Results[0].Suggests))
        		  	dispatch(requestData(false))
        	 
             } 
	})},
    onSearch:(dispatch,type,value)=>{
    	dispatch(isInit(true))
    	var value=encodeURI(value.trim().replace(/\s+/ig,'+'))
    		if(type=='video'){
			
			axios.get('https://api.vimeo.com/videos?access_token=bff4a0260496cc72b64158bc0670c01a&direction=asc&filter=CC-BY-NC&page=1&per_page=24&query='+value+'&sort=relevant')
			.then((data)=>{
				dispatch(initResult({key:'videoResult',value:data.data.data}))
				dispatch(preValue(value))
				dispatch(setPage(1))
				dispatch(isInit(false))
			})
		}
		else{

			axios.get('https://pixabay.com/api/?key=8956304-4d698e1be91b3c3961d70bffc&q='+value+'&image_type=all&per_page=24&page=1').then((data)=>{
				
				dispatch(initResult({key:'imageResult',value:data.data.hits}))
				dispatch(preValue(value))
				dispatch(setPage(1))
				dispatch(isInit(false))
			})
		}
    },
	addResult:(dispatch,type,value,page)=>{   
		
		var value=encodeURI(value.trim().replace(/\s+/ig,'+'))
		dispatch(isAdding(true))
		if(type=='video'){
			
			axios.get('https://api.vimeo.com/videos?access_token=bff4a0260496cc72b64158bc0670c01a&direction=asc&filter=CC-BY-NC&page='+(page+1)+'&per_page=24&query='+value+'&sort=relevant')
			.then((data)=>{
				dispatch(addResult({key:'videoResult',value:data.data.data}))
				dispatch(setPage((page+1)))
				
			})
		}
		else if (type=='image'){
			axios.get('https://pixabay.com/api/?key=8956304-4d698e1be91b3c3961d70bffc&q='+value+'&image_type=all&per_page=24&page='+(page+1)).then((data)=>{
				
				dispatch(addResult({'key':'imageResult',value:data.data.hits}))		
				dispatch(setPage(page+1))			
			})
		}
		
	},



};