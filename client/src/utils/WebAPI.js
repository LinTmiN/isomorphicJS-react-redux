import axios from 'axios';

import {
	requestLogin,
	receiveUser,
	loginError,
	registerStart,
	setAuth,
	registerFailed,
	requestData,
	getKey,
	setPage,
	setInput,
	preValue,initResult,addResult,isInit,receiveCollect,isCheck,isAdding,fetchCollect,getTrends,isGetTrends,isEditAvatar,editedAvatar,editAvatarStatus
} from '../actions';

function getCookie(keyName){
	var name=keyName+'=';
	const cookies = document.cookie.split(';');
	for (let i=0;i<cookies.length;i++){
		let cookie =cookies[i].trim();
		if(cookie.indexOf(name)===0){
			return cookie.substring(name.length,cookie.length)
		}
	}
	return '';
}
let WebAPI={
	login:(dispatch,email,password)=>{
		dispatch(requestLogin(true))

		axios.post('/api/login',{
			email:email,
			password:password
		}).then((res)=>{
			if(res.data.success === false){
				dispatch(loginError(res.data.message))
				
				dispatch(requestLogin(false))
			}else{
				if(!document.cookie.token){
					let d = new Date();
					d.setTime(d.getTime()+(24*60*60*1000));
					const expires = 'expires='+d.toUTCString();
					document.cookie = 'token='+res.data.token+';'+expires;
					dispatch(receiveUser(res.data.user))
					dispatch(receiveCollect(res.data.collect))
					dispatch(setAuth({value:true}))
					dispatch(requestLogin(false))
					
				}
			}
			
		})
		.catch(function(error){
			dispatch(loginError('遇到一个错误，请检测网络状况'))
			
			dispatch(requestLogin(false))
		})
	},
	logout:(dispatch)=>{
		document.cookie ='token=;'+'expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		dispatch(setAuth({value:false}))
	},
	checkAuthor:(dispatch)=>{
		dispatch(isCheck(true))
		axios.get('/api/authenticate?token='+getCookie('token')+'&t='+(new Date()).getTime().toString())
		.then((res)=>{
			
			if(res.data.success===true){
				dispatch(setAuth(true))
				dispatch(receiveUser(res.data.user))
				dispatch(receiveCollect(res.data.user.collect))
				dispatch(isCheck(false))
				
			}else{
				dispatch(setAuth(false))
				dispatch(isCheck(false))
				
			}
		}).catch((err)=>{
			dispatch(setAuth(false))
			dispatch(isCheck(false))
		})
	},
	register:(dispatch,user)=>{

		dispatch(registerStart())
		axios.post('/api/register',user).then((res)=>{
			if(res.data.success===false){
				dispatch(registerFailed())
			}else{
				
				this.a.login(dispatch,res.data.user.email,res.data.user.password)
			}
		})
		.catch((err)=>{
			
			dispatch(registerFailed())
		})
	},
	getSearchKey:(dispatch,value)=>{
		
        dispatch(requestData(true))
        axios.get('https://api.cognitive.microsoft.com/bing/v7.0/suggestions/?q='+value,{headers:{"Ocp-Apim-Subscription-Key":"65271e84408f4e49812b1a349b81170f"}}).then(({data})=>{
        	  
        	    if(data.suggestionGroups){
        	    	let List=data.suggestionGroups[0].searchSuggestions.map((item)=>{return item.displayText})
        	    	console.log(List)
        		  	dispatch(getKey(List))
        		  	dispatch(requestData(false))
        		 
             } 
	})
	},
    onSearch:(dispatch,type,value)=>{
    	dispatch(isInit(true))
    	
    	var value=encodeURI(value.trim().replace(/\s+/ig,'+'))
    		if(type==='video'){
			
			axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q='+value+'&regionCode=US&type=video&fields=items(id(channelId%2CvideoId)%2Csnippet(channelId%2CchannelTitle%2Cdescription%2CpublishedAt%2Cthumbnails%2Fmedium%2Ctitle))%2CnextPageToken%2CpageInfo%2FtotalResults&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A')
			.then(({data})=>{
				dispatch(initResult({key:'videoResult',value:data.items}))
				dispatch(preValue(value))
				dispatch(setPage(data.nextPageToken))
				dispatch(isInit(false))
				dispatch(setInput({key:'total',value:data.pageInfo.totalResults}))
			})
		}
		else{

			axios.get('https://api.unsplash.com/search/photos?page=1&per_page=24&query='+value+'&client_id=8e49ffe791fa753b1d76486427f9f2020b38e6599079c929a49b5ac197767992').then((data)=>{
				
				dispatch(initResult({key:'imageResult',value:data.data.results}))
				dispatch(preValue(value))
				dispatch(setPage(2))
				dispatch(isInit(false))
				dispatch(setInput({key:'total',value:data.data.total}))
			})
		}
    },
	addResult:(dispatch,type,value,page)=>{   
		if(!value){return }
		var value=encodeURI(value.trim().replace(/\s+/ig,'+'))
		
		if(type==='video'){
			
			axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&pageToken='+page+'&q='+value+'&regionCode=US&type=video&fields=items(id(channelId%2CvideoId)%2Csnippet(channelId%2CchannelTitle%2Cdescription%2CpublishedAt%2Cthumbnails%2Fmedium%2Ctitle))%2CnextPageToken%2CpageInfo%2FtotalResults&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A')
			.then(({data})=>{
				dispatch(addResult({key:'videoResult',value:data.items}))
				dispatch(setPage(data.nextPageToken))
				dispatch(isAdding(true))
			})
		}
		else if (type==='image'){
			if(value==='rementupian热'){
				return axios.get('https://api.unsplash.com/photos/curated?page='+(page)+'&per_page=24&client_id=8e49ffe791fa753b1d76486427f9f2020b38e6599079c929a49b5ac197767992')
				.then(({data})=>{
						dispatch(addResult({'key':'imageResult',value:data}))		
					dispatch(setPage(page+1))
					dispatch(isAdding(true))
				})
			}
			axios.get('https://api.unsplash.com/search/photos?page='+(page)+'&per_page=24&query='+value+'&client_id=8e49ffe791fa753b1d76486427f9f2020b38e6599079c929a49b5ac197767992').then((data)=>{
				
				dispatch(addResult({'key':'imageResult',value:data.data.results}))		
				dispatch(setPage(page+1))	
				dispatch(isAdding(true))		
			})
		}
		
	},
	getCollect:(dispatch)=>{
		return axios.get('/api/collect?token='+getCookie('token')).then((res)=>{
			if(res.data.success){
				
				dispatch(receiveCollect(res.data.collect))
				return true
			}else{
				
				return false
			}
		})
	},
	addCollect:(dispatch,newcollect)=>{
		return axios.put('/api/collect?token='+getCookie('token'),{newcollect:newcollect})
	},
	deleteCollect:(dispatch,collectId)=>{
		
		axios.delete('/api/collect/'+collectId+'?token='+getCookie('token'))
	},
	getLike:(id)=>{
		return axios.get('/api/likes/'+id+'?token='+getCookie('token'))
	},
	like:(obj)=>{
		return axios.put('/api/like?token='+getCookie('token'),{like:obj})
	},
	unlike:(id)=>{
		return axios.delete('/api/unlike/'+id+'?token='+getCookie('token'))
	},
	fetchCollect:(dispatch,collect)=>{
	   dispatch(setInput({key:'fetching',value:true}))
		let Promises=collect.map((item)=>{
			return axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id='+item+'&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A')  
		})
		 Promise.all(Promises).then((res)=>{
	
		 	 let channalPromises=res.map((item)=>{
		 	 	return axios.get('https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id='+item.data.items[0].snippet.channelId+'&fields=items%2Fsnippet%2Fthumbnails%2Fmedium&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A')
		 	 })
		 	 Promise.all(channalPromises).then((channalres)=>{
		 	 	
		 	 	  let infos=res.map((item,index)=>{
		 	 	  	 return {
		 	 	  	 	 name:item.data.items[0].snippet.channelTitle,
						time:item.data.items[0].snippet.publishedAt,
						avatar:channalres[index].data.items[0].snippet.thumbnails.medium.url,
						thumbnails:item.data.items[0].snippet.thumbnails.maxres||item.data.items[0].snippet.thumbnails.standard||item.data.items[0].snippet.thumbnails.medium
		 	 	  	 }
		 	 	  })
		 	 	  dispatch(fetchCollect(infos))
		 	 	   dispatch(setInput({key:'fetching',value:false}))
		 	 })
		 })
	},
	getTrends:(dispatch)=>{
		dispatch(isGetTrends(true))
		axios.get('/api/trends?token='+getCookie('token')).then(({data})=>{
			 if(data.success){
			 	let Promises=data.trends.map((trend)=>{
			 		if(trend.type==='image'){
			 			return axios.get('https://api.unsplash.com/photos/'+trend.id+'?client_id=8e49ffe791fa753b1d76486427f9f2020b38e6599079c929a49b5ac197767992')		
			 		}else{
			 			return axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id='+trend.id+'&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A')
			 		}
			 	});
			 	Promise.all(Promises).then((responses)=>{
			 		
			 		let videoChannelPromises=responses.filter((res)=>{
			 			return !!res.data.kind
			 		}).map((res)=>{return axios.get('https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id='+res.data.items[0].snippet.channelId+'&fields=items%2Fsnippet%2Fthumbnails%2Fmedium&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A')})
			 		Promise.all(videoChannelPromises).then((videoChannelRes)=>{
			 			 let trends= responses.map((res,index)=>{
			 			 	   data.trends[index].info=res.data.kind?
			 			 	  {
			 			 	  	name:res.data.items[0].snippet.channelTitle,
			 			 	  	avatar:videoChannelRes.shift().data.items[0].snippet.thumbnails.medium.url,
			 			 	  	thumbnails:(res.data.items[0].snippet.thumbnails.maxres&&res.data.items[0].snippet.thumbnails.maxres.url)||(res.data.items[0].snippet.thumbnails.standard&&res.data.items[0].snippet.thumbnails.standard.url)||(res.data.items[0].snippet.thumbnails.medium&&res.data.items[0].snippet.thumbnails.medium.url)
			 			 	  }:{
			 			 	  	name:res.data.user.name,
			 			 	  	avatar:res.data.user.profile_image.medium,
			 			 	  	thumbnails:res.data.urls.thumb
			 			 	  }
			 			 	   return data.trends[index]
			 			 })
			 			  dispatch(getTrends(trends))
			 			 dispatch(isGetTrends(false))
			 		})
			 	})
			 }else{
			 	return false
			 }
		})
	},
	editAvatar:(dispatch,file)=>{
		dispatch(isEditAvatar(true))
		if(file==='delete'){
			return axios.delete('api/upload?token='+getCookie('token')).then(({data})=>{
				console.log(data)
				if(data.success){
					dispatch(editedAvatar(data.avatar))
					dispatch(isEditAvatar(false))
					dispatch(editAvatarStatus({message:data.message,date:Date.now()}))
				}else{
					dispatch(editAvatarStatus({...data,date:Date.now()}))
					dispatch(isEditAvatar(false))
				}
			})
		}
		const data = new FormData()
		 data.append('avatar',file)
		 console.log(data)
		axios.put('api/upload?token='+getCookie('token'),data).then(({data})=>{
			if(data.success){
				dispatch(editedAvatar(data.avatar))
				dispatch(isEditAvatar(false))
				dispatch(editAvatarStatus({message:data.message,date:Date.now()}))
			}else{
				dispatch(editAvatarStatus({...data,date:Date.now()}))
				dispatch(isEditAvatar(false))
			}
		})
	},


};
export default WebAPI