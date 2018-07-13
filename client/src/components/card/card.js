import { Icon,Loader} from 'semantic-ui-react';

import {lorem,name} from 'faker/locale/en';
import React from 'react';
import axios from 'axios'
import WebAPI from '../../utils/WebAPI'
import {handleNum,handleTime} from '../../constants/fun'
import {NavLink } from 'react-router-dom'
class Card extends React.PureComponent {
	constructor(props){
		super(props)
		
		this.state={
			comment:[],
			page:0,
			isCollect:false,
			info:{},
			like:0,
			mediaOnload:false,
			ava:false,
			textH:18,
			url:'',
			width:''
		}
		this.addCollect=this.addCollect.bind(this)
		this.loadMoreComment=this.loadMoreComment.bind(this)
		
		this.myref=React.createRef()
		this.getData=this.getData.bind(this)
	}
	
	componentDidMount(){
		
		this.getData()
		
		
	}
	componentDidUpdate(prevProps){
		
		if (this.props.id !== prevProps.id) {
		    this.getData()
		  }
		if(this.wRef){this.setState({width:this.wRef.clientWidth})}

	}
	getData(){
		const {getCollect,type,onCardInit,id}=this.props;
		getCollect().then((data)=>{
			if(data){
				
				this.props.collect.toJS().forEach((item)=>{
					if(item.id===id){
						this.setState({
							isCollect:true
						})
					}
				})
			}
		})
		WebAPI.getLike(id).then(({data})=>{
			
			if(data.islike){
				this.setState({like:1})
			}
		})
		if(type==='image'){
			let fakeComment=Array.apply(null,{length:Math.round(Math.random()*100)})
			                .map((a)=>({username:name.findName(),text:lorem.sentence()}));
			axios.get('https://api.unsplash.com/photos/'+id+'?client_id=8e49ffe791fa753b1d76486427f9f2020b38e6599079c929a49b5ac197767992&w=600')
			.then(({data})=>{
			
			   this.comment=fakeComment
				let info={
					username:data.user.name,
					avatar:data.user.profile_image.small,
					likes:data.likes,
					description:data.description,
					time:data.created_at,
					width:data.width,
					height:data.height
				}
				 let page=fakeComment.length<25?0:1
				this.setState({
					info:info,
			    	comment:this.comment.slice(0,25),
			    	page:page,
			    	url:data.urls.custom,


				})
				 setTimeout(()=>onCardInit(),500)
			})
			 
		}else if (type==='video'){
			const promises =[axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id='+id+'&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A'),axios.get('https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=24&videoId='+id+'&fields=items(snippet(topLevelComment(snippet(authorDisplayName%2CtextDisplay%2CtextOriginal))))%2CnextPageToken&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A')]
			Promise.all(promises).then((res)=>{

				axios.get('https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id='+res[0].data.items[0].snippet.channelId+'&fields=items%2Fsnippet%2Fthumbnails%2Fmedium&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A').then(({data:mydata})=>{
					
					let { data}=res[1],
				    info={
						username:res[0].data.items[0].snippet.channelTitle,
						avatar:mydata.items[0].snippet.thumbnails.medium.url,
						likes:res[0].data.items[0].statistics.likeCount,
						description:res[0].data.items[0].snippet.description,
						time:res[0].data.items[0].snippet.publishedAt,

					},
					comment=data.items.map((item)=>({username:item.snippet.topLevelComment.snippet.authorDisplayName,text:item.snippet.topLevelComment.snippet.textOriginal}));
					
				this.setState({
					info:info,
					comment:comment,
					page:data.nextPageToken
					
				})
				 setTimeout(()=>onCardInit(),500)
				})
				
			})

		}
	}
	loadMoreComment(){
      const {type}=this.props
      this.setState({load:true})
      if( type==='image'){
      	  this.setState((preS)=>{
      	  	 let page=(preS.page+1)*25>this.comment.length?'':preS.page+1;
      	  	return {
      	  	comment:this.comment.slice(0,25*(preS.page+1)),
      	  	page:page,
      	  	load:false
      	  }})
      }else if(type==='video'){
      
      	axios.get('https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&pageToken='+this.state.page+'&maxResults=24&videoId='+this.props.id+'&fields=items(snippet(topLevelComment(snippet(authorDisplayName%2CtextDisplay%2CtextOriginal))))%2CnextPageToken&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A')
      	.then(({data})=>{
      		 	let comment=data.items.map((item)=>({username:item.snippet.topLevelComment.snippet.authorDisplayName,text:item.snippet.topLevelComment.snippet.textOriginal}));
      		 	   
      		 		this.setState((preS)=>({
      		 			comment:preS.comment.concat(comment),
      		 			page:data.nextPageToken,
      		 			load:false
      		 		}))
      		 	
      	})
      }
	}
	addCollect(newCollect){
		if(!this.state.isCollect){
  			//没收藏，发出收藏请求
			this.props.addCollect(newCollect)()
			this.setState({
				isCollect:true
			})
			
		}else {
			let id=newCollect.id
			this.props.deleteCollect(id)()
			this.setState({
				isCollect:false
			})	
		}
	}
	togglelike(obj){
		if(this.state.like===1){
			WebAPI.unlike(obj.id)
			this.setState({like:0})
		}else if(this.state.like===0){
			WebAPI.like(obj)
			this.setState({like:1})
		}
	}
	urlSet(url,width){
		return url.replace(/&w=[\d]+/,'&w='+width)
	}
	render(){
			let { id,type}=this.props,
			     {info,comment}=this.state,		    
			    
			     comments=comment.map((c,index)=><li key={index}><span className='_cdusname'>{c.username}</span>{c.text}</li>),
			     rate=this.state.info.height/this.state.info.width;
			  
			return (
			<React.Fragment>
				{this.props.isCardInit?(
					<div  className='_cdBox'>
						<div className='_cdct'>
						  <div style={rate>1?{maxWidth:400+600/rate+'px'}:{}} onClick={(e)=>e.stopPropagation()} className='_cdjs2'>
							<article className='_cdati _cdatirs'>
							    <div className='_cdimmd _cdim2rs'>
							       <div ref={(re)=>this.wRef=re} className='_cdim2 ' style={type==='image'?(rate>1?{paddingTop:100*rate+'%'}:{}):{}}>
							        {this.state.mediaOnload?'':<div style={{background:'#F4F0F0'}} className='_uspboxmmModal'></div>}
							       	{type==='image'?<img sizes={this.state.width+'px'} srcSet={`${this.urlSet(this.state.url,640)} 640w,${this.urlSet(this.state.url,1080)} 1080w,${this.urlSet(this.state.url,750)} 750w,`} className='_blurimg' onLoad={()=>this.setState({mediaOnload:true})} alt={`${info.username}'s img`} src={rate>1?this.urlSet(this.state.url,400+600/rate-335):this.urlSet(this.state.url,this.state.width)} />:
							       	<iframe title={`${info.username}'s video`} onLoad={()=>this.setState({mediaOnload:true})} className='_miframe' src={"https://www.youtube.com/embed/"+this.props.id+"?rel=0&showinfo=0&iv_load_policy=3"}
										frameBorder="0" allowFullScreen >
								     </iframe>}
							      	</div>
							    </div>
								<header className='_cdhd1'>
								    <div className='_cdhd2'>
									<div className='_cdhdim'>{this.state.ava?"":<div style={{background:'#F4F0F0',position:'static'}} className='_uspboxmmModal'></div>}<img onLoad={()=>this.setState({ava:true})} alt={`${info.username}'s avatar`} src={info.avatar} /></div>
									<div className='_cdusname1'><h1 >{info.username}<span> ·关注</span></h1></div>
									</div>
								</header>
								<div className='_ncdall'>
									<div className='_ncdcm'>
										<ul>
										   {info.description?<li><span className='_cdusname'>{info.username}</span>{info.description}</li>:''}
										   {this.state.page?(<li onClick={this.loadMoreComment} style={{fontSize:'14px',fontWeight:'400',color:'#999',cursor:'pointer'}}>Load more comment {this.state.load?<Loader size='mini' active inline />:''}</li>):''}
										   	  {comments.reverse()}
										</ul>
									</div>
									
									 <div className='_ncdicon'>
										<Icon onClick={()=>this.togglelike({id:id,type:type})} size='big' name={this.state.like?'heart':'heart outline'} style={{cursor:'pointer',color:this.state.like?'#FB4E4E':'black'}}/>
										<Icon onClick={()=>this.myref.current.focus()} style={{paddingLeft:'10px',cursor:'pointer'}} size='big' name='comment outline'/>
										<Icon onClick={()=>this.addCollect({id:this.props.id,type:this.props.type})} size='big' name={this.state.isCollect?'bookmark':'bookmark outline'} className='_ncdicr' style={{cursor:'pointer'}}/>
									</div>
									<div className='_ncdlk'>
										{handleNum(info.likes+this.state.like)+' likes'}
									</div>
									<div className='_ncdtime'><time>{handleTime(info.time)}</time> </div>
									<section className='_cdta'>
				
					<form >
					<textarea onChange={(e)=>{
						e.target.scrollTop=0
						let H=e.target.value===''?18:e.target.scrollHeight
						this.setState({value:e.target.value,textH:H})
					}} onKeyDown={(e)=>{
						if(e.keyCode===13){
							e.preventDefault()
							this.setState((s,p)=>{
								let comment=s.comment
								  comment.unshift({username:p.userInfo.username,text:s.value})
								 return {comment:comment,value:'',textH:18}
							})
						}
					}} ref={this.myref}  wrap="virtual" placeholder='添加评论...' style={{height:this.state.textH+'px'}} value={this.state.value}  className='_cdtai' ></textarea>
					</form>
					<NavLink to={`/detail/${type}/${id}`}> <Icon  name='ellipsis horizontal' /> </NavLink>
				</section>
									
								</div>
							</article>
						  </div>
						</div>
					</div>):''}
			</React.Fragment>
			)}
	
}
export default Card
