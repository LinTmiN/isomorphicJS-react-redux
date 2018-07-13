import React from 'react';

import {connect} from 'react-redux';
import {Icon } from 'semantic-ui-react'
import axios from 'axios'
import {name,lorem} from 'faker/locale/en';
import { Loader } from 'semantic-ui-react'
import WebAPI from '../../utils/WebAPI.js'
import {handleNum,handleTime} from '../../constants/fun'
class CollectCard extends React.PureComponent{
	constructor(props){
		super(props)
		this.state={
			isCollect:true,
			info:{},
			comment:[],
			like:0,
			textH:18,
			
			show:true,
			embed:false,
			thumbnails:{},
			width:''
		}
		this.loadMoreComment=this.loadMoreComment.bind(this)
		
		
		this.addCollect=this.addCollect.bind(this)
		this.myref=React.createRef()
		this.me=React.createRef()
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
	componentWillUnmount(){
		this.Mounted=false
	}

	getData=()=>{
		const {id}=this.props;
		WebAPI.getLike(id).then(({data})=>{
			
			if(data.islike&&this.Mounted){
				this.setState({like:1})
			}
		})
		if(this.props.type==='image'){
			let fakeComment=Array.apply(null,{length:Math.round(Math.random()*100)})
			                .map((a)=>({username:name.findName(),text:lorem.sentence()}));
			    axios.get('https://api.unsplash.com/photos/'+id+'?w=600&client_id=8e49ffe791fa753b1d76486427f9f2020b38e6599079c929a49b5ac197767992')
			.then(({data})=>{
				this.comment=fakeComment;
				if(!this.Mounted){return}
				let info={
					username:data.user.username,
					avatar:data.user.profile_image.small,
					likes:data.likes,
					description:data.description,
					time:data['created_at']
				}
				
				this.setState({
					info:info,
			    	comment:this.comment.slice(0,4),
			    	total:this.comment.length,
			    	page:1,
			    	thumbnails:data.urls,
			    
			    	
				})
			})
		}else if (this.props.type==='video'){
			const promises =[axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id='+id+'&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A'),axios.get('https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=4&videoId='+id+'&fields=items(snippet(topLevelComment(snippet(authorDisplayName%2CtextDisplay%2CtextOriginal))))%2CnextPageToken&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A')]
			Promise.all(promises).then((res)=>{

				axios.get('https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id='+res[0].data.items[0].snippet.channelId+'&fields=items%2Fsnippet%2Fthumbnails%2Fmedium&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A')
				.then(({data:mydata})=>{
					if(!this.Mounted){return}
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
					page:data.nextPageToken,					
					thumbnails:res[0].data.items[0].snippet.thumbnails
			    	
				})
				 
				})
				
			})

		}
	}
	componentDidMount(){
		this.Mounted=true
		this.setState({width:this.img.clientWidth})
			this.getData()
		
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
      		 	
      		 	if(this.state.comment.length<24){
      		 	this.setState((preS)=>({
      		 		comment:preS.comment.concat(comment.slice(5)),
      		 		page:data.nextPageToken,
      		 		load:false
      		 	}))}else{
      		 		this.setState((preS)=>({
      		 			comment:preS.comment.concat(comment),
      		 			page:data.nextPageToken,
      		 			load:false
      		 		}))
      		 	}
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
	urlSet(url,width,height){
		return url.replace(/&w=[\d]+&((fit=max)|(fit=crop))?/,`&w=${width}${height?'&h='+height:''}&fit=crop`)
	}
	srcset(src){
		let {type}=this.props
		if(type==='image'){
			return `${this.urlSet(src,240)} 240w,${this.urlSet(src,320)} 320w,${this.urlSet(src,480)} 480w,${this.urlSet(src,640)} 640w`
		}else{
			let key=Object.keys(this.state.thumbnails),
				srcset='';
			for(let a in key){
				srcset += `${this.state.thumbnails[key[a]].url} ${this.state.thumbnails[key[a]].width}w,`
			}
			return srcset
		}
	}
    componentDidUpdate(nextP){
    	if(this.props.screen.toJS().width!==nextP.screen.toJS().width){
    		this.setState({width:this.img.clientWidth})
    	}
    }
	render(){
		let {info,comment,thumbnails}=this.state,
		    {id,type}=this.props,
		   comments=comment.map((c,index)=><li key={index}><span className='_cdusname'>{c.username}</span>{c.text}</li>),
		   src=type==='video'?(thumbnails.default?thumbnails.default.url:''):thumbnails.small||'',
		   srcset=this.srcset(src)
		return ( 
		<article ref={this.me} className='_cdbg'>
			<header className='_cdhd'>
				<div className='_usava'><div className='_usava2'>{info.avatar?<img alt={`${info.username}'s avatar`} src={info.avatar} />:''}</div></div>
				<div className='_usnm'><h1>{info.username}</h1></div>
			</header>
			<div ref={(r)=>this.img=r}  className='_cdim' >
			    {
			    
			    this.props.type==='image'?
			         (<img className='img-small img-default img-Cdefault' sizes={this.state.width+'px'} data-src={src} data-srcset={srcset} alt={info.username+"'s media"}   src={this.urlSet(src,10)}/>)
			      :
			    this.state.embed?
			    	(<iframe title={info.username+'\'s video'} style={{width:'100%',height:'100%',position:'absolute',top:"0",left:'0'}} src={"https://www.youtube.com/embed/"+this.props.id+"?rel=0&showinfo=0&autoplay=1&iv_load_policy=3"}
				   		frameBorder="0" allowFullScreen ></iframe>)
				     :<div className='_frameMod'>
					        <div onClick={()=>this.setState({embed:true}) } >
	  			            	<Icon  size='massive' name='video play' />
	  			      		</div>
	  			      		<img alt={info.username+'\'s post image'} className='img-small img-default' sizes={this.state.width+'px'} data-srcset={srcset} data-src={thumbnails.medium?thumbnails.medium.url:''} src={src||''} />
			      	   </div>
				}
			</div>
			<div className='_cdall'>
				<div className='_cdicon'>
					<Icon onClick={()=>this.togglelike({id:id,type:type})} size='big' name={this.state.like?'heart':'heart outline'} style={{cursor:'pointer',color:this.state.like?'#FB4E4E':'black'}}/>
					<Icon onClick={()=>this.myref.current.focus()}  size='big' name='comment outline' style={{cursor:'pointer',paddingLeft:'10px'}}/>
					<Icon onClick={()=>this.addCollect({id:this.props.id,type:this.props.type})} size='big' name={this.state.isCollect?'bookmark':'bookmark outline'} className='_cdicr' style={{cursor:'pointer'}}/>
				</div>
				<div className='_cdlk'>
					{info.likes?handleNum(info.likes+this.state.like)+' likes':''}
				</div>
				<div className='_cdcm'>
					<ul>
					   <li><span className='_cdusname'>{info.username}</span>{info.description}</li>
					   {this.state.page?(<li onClick={this.loadMoreComment} style={{fontSize:'14px',fontWeight:'400',color:'#999',cursor:'pointer'}}>Load more comment {this.state.load?<Loader size='mini' active inline />:''}</li>):''}
					   	  {comments.reverse()}
					</ul>
				</div>
				<div className='_cdtime'>{info.time?<time>{handleTime(info.time)}</time>:"'" }</div>
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
				</section>
				
			</div>
		</article>
		)
	}
}
const mapStatetoProps=(state)=>({
	screen:state.getIn(['input','screen']),
	userInfo:state.getIn(['user','userInfo']).toJS(),
	
})
const mapDispatchtoPros=(dispatch)=>({
	deleteCollect:(collectId)=>()=>{
			WebAPI.deleteCollect(dispatch,collectId)
		},
	addCollect:(newcollect)=>()=>{
			 WebAPI.addCollect(dispatch,newcollect)
		},
})
export default connect(mapStatetoProps,mapDispatchtoPros)(CollectCard)
