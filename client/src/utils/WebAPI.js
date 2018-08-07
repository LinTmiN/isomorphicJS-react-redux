import axios from 'axios';
import fetchJsonp from 'fetch-jsonp'
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
	validate,
	getMyCollect,
	getMylikes,
	registerEnd,
	clearAll,
	preValue,updateUser,initResult,addResult,isInit,receiveCollect,isCheck,isAdding,fetchCollect,getTrends,isGetTrends,isEditAvatar,editedAvatar,editAvatarStatus
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
					dispatch(setInput({key:'password',value:''}))
					dispatch(setInput({key:'email',value:''}))
				}
			}
			
		})
		.catch(function(error){
			dispatch(loginError('遇到一个错误，请检测网络状况'))
			
			dispatch(requestLogin(false))
		})
	},
	logout:(dispatch)=>{
		document.cookie ='token="";expires=-1'
		dispatch(setAuth(false))
	},
	checkAuthor:(dispatch)=>{
		dispatch(isCheck(true))
		axios.get('/api/authenticate?token='+getCookie('token'))
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
	 validate:(dispatch,user)=>{
	 	return axios.post('api/attempt',user).then(({data})=>{
	 		dispatch(validate(data))
	 		return data
	 	})
	 }
	,
	register:(dispatch,user)=>{

		dispatch(registerStart())
		return axios.post('/api/register',user).then(({data})=>{
			if(data.success===false){
				dispatch(registerFailed(data.errObj.err[Object.keys(data.errObj.err)[0]].message))
				dispatch(validate(data.errObj))
				return false
			}else if(data.success===true){
				
				this.a.login(dispatch,user.email,user.password);
				dispatch(registerEnd())
				dispatch(clearAll())
				return true
			}
		})

	},
	getSearchKey:(dispatch,value)=>{
		
        dispatch(requestData(true))
       	fetchJsonp('http://suggestion.baidu.com/su?wd='+value+'&p=3',{
    		jsonpCallback: 'cb',
 		 }).then(function(response) {
			    return response.json()
			  }).then(function(json) {
			      dispatch(getKey(json.s))
			      dispatch(requestData(false))
			  }).catch(function(ex) {
			    
			    dispatch(requestData(false))
			  })
	},
    onSearch:(dispatch,type,value)=>{
    	dispatch(isInit(true))
    	
    	 value=encodeURI(value.trim().replace(/\s+/ig,'+'))
    		if(type==='video'){
			
			axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q='+value+'&regionCode=US&type=video&fields=items(id(channelId%2CvideoId)%2Csnippet(channelId%2CchannelTitle%2Cdescription%2CpublishedAt%2Cthumbnails%2Ctitle))%2CnextPageToken%2CpageInfo%2FtotalResults&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A')
			.then(({data})=>{
				dispatch(initResult({key:'videoResult',value:data.items,watch:value}))
				dispatch(preValue(value))
				dispatch(setPage(data.nextPageToken))
				dispatch(isInit(false))
				dispatch(setInput({key:'total',value:data.pageInfo.totalResults}))
			})
		}
		else{

			axios.get('https://api.unsplash.com/search/photos?page=1&per_page=24&query='+value+'&client_id=8e49ffe791fa753b1d76486427f9f2020b38e6599079c929a49b5ac197767992').then((data)=>{
				
				dispatch(initResult({key:'imageResult',value:data.data.results,watch:value}))
				dispatch(preValue(value))
				dispatch(setPage(2))
				dispatch(isInit(false))
				dispatch(setInput({key:'total',value:data.data.total}))
			})
		}
    },
	addResult:(dispatch,type,value,page)=>{   
		if(!value){return }
		value=encodeURI(value.trim().replace(/\s+/ig,'+'))
		
		if(type==='video'){
			
			axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&pageToken='+page+'&q='+value+'&regionCode=US&type=video&fields=items(id(channelId%2CvideoId)%2Csnippet(channelId%2CchannelTitle%2Cdescription%2CpublishedAt%2Cthumbnails%2Fmedium%2Ctitle))%2CnextPageToken%2CpageInfo%2FtotalResults&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A')
			.then(({data})=>{
				dispatch(addResult({key:'videoResult',value:data.items,watch:value}))
				dispatch(setPage(data.nextPageToken))
				dispatch(isAdding(true))
			})
		}
		else if (type==='image'){
			if(value==='rementupian'){
				return axios.get('https://api.unsplash.com/photos?page='+(page)+'&per_page=24&order_by=popular&client_id=8e49ffe791fa753b1d76486427f9f2020b38e6599079c929a49b5ac197767992')
				.then(({data})=>{
						dispatch(addResult({'key':'imageResult',value:data,watch:value}))		
					dispatch(setPage(page+1))
					dispatch(isAdding(true))
				})
			}
			axios.get('https://api.unsplash.com/search/photos?page='+(page)+'&per_page=24&query='+value+'&client_id=8e49ffe791fa753b1d76486427f9f2020b38e6599079c929a49b5ac197767992').then((data)=>{
				
				dispatch(addResult({'key':'imageResult',value:data.data.results,watch:value}))		
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
		return Promise.all(Promises).then((res)=>{
	
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
		 	 	  return true
		 	 })
		 }).catch((err)=>{console.log(err)})
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
			return axios.delete('/api/upload?token='+getCookie('token')).then(({data})=>{
				
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
		let data = new FormData()
		 data.append('avatar',file)
		
		axios.post('/api/upload?token='+getCookie('token'),data).then(({data})=>{
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
	fetchmy:(dispatch,type,arr)=>{
		  if(!arr)return
		let promises=arr.map((item)=>{
			if(item.type==='image'){
				return axios.get('https://api.unsplash.com/photos/'+item.id+'?client_id=8e49ffe791fa753b1d76486427f9f2020b38e6599079c929a49b5ac197767992')
			}else {
				return Promise.all([axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id='+item.id+'&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A'),axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id='+item.id+'&fields=items%2Fstatistics&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A')])
			}
		})
		return Promise.all(promises).then((reses)=>{
		 	 let data=reses.map((res,index)=>{
		 	 	 if(arr[index].type==='image'){
		 	 	 	
		 	 	 	return ({
		 	 	 		type:'image',
		 	 	 		thumbnail:res.data.urls,
		 	 	 		likes:res.data.likes,
		 	 	 		id:arr[index].id
		 	 	 	})
		 	 	 }else{
		 	 	 	
		 	 	 	return ({
		 	 	 		type:'video',
		 	 	 		id:arr[index].id,
		 	 	 		likes:res[1].data.items[0].statistics.likeCount,
			  	 	    comment:res[1].data.items[0].statistics.commentCount,
		 	 	 		thumbnail:res[0].data.items[0].snippet.thumbnails
		 	 	 	})
		 	 	 }
		 	 });
		 	 if(type==='likeslist'){
		 	 	dispatch(getMylikes(data));
		 	 	return true
		 	 }else{
		 	 	dispatch(getMyCollect(data))
		 	 	return true
		 	 }
		 })
	},
	editProfile:(dispatch,data)=>{
		return axios.post('/api/editProfile?token='+getCookie('token'),data).then(({data})=>{
			if(data.token){
			
				document.cookie='token='+data.token
			}
			if(data.success){
				if(data.user){
				dispatch(updateUser(data.user))
				}
				dispatch(editAvatarStatus({message:data.message,date:Date.now()}))
				return true
			}else {
				dispatch(editAvatarStatus({message:data.message,date:Date.now()}))
				return false
			}
		})
	}
};
export default WebAPI