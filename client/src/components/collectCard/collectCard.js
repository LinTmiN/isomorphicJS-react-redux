import React from 'react';
import './collectCard.css';
import {connect} from 'react-redux';
import {Icon } from 'semantic-ui-react'
import axios from 'axios'
import faker from 'faker'
import { Loader } from 'semantic-ui-react'
import WebAPI from '../../utils/WebAPI.js'
class CollectCard extends React.Component{
	constructor(props){
		super(props)
		this.state={
			isCollect:true,
			info:{},
			comment:[],
		}
		this.loadMoreComment=this.loadMoreComment.bind(this)
		this.toThos=this.toThos.bind(this)
		this.handleTime=this.handleTime.bind(this)
		this.addCollect=this.addCollect.bind(this)
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
	handleTime=(time)=>{
		let minute = 1000*60,
		    hour =minute*60,
		    day=hour*24	,
		    month=day*30,
		    year = day*365,
			now=Date.parse(new Date()),
		 	vTime=Date.parse(new Date(time)),
		  	diffV=now-vTime,
		  	yearC=diffV/year,
		  	monthC=diffV/month,
		  	weekC=diffV/(7*day),
		  	dayC=diffV/day,
		  	hourC=diffV/hour,
		  	minC=diffV/minute;
	  	if(yearC>=1){
	  		  return  Math.floor(yearC)+' years ago'
	  	}else if(monthC>=1){
	  		return Math.floor(monthC)+' months ago'
	  	}else if(weekC>=1){
	  		return Math.floor(weekC)+' weeks ago'
	  	}else if(dayC>=1){
	  		return Math.floor(dayC)+' days ago'
	  	}else if (hourC>=1){
	  		return Math.floor(hourC)+ ' hours ago'
	  	}else if (minC>=1){
	  		return Math.floor(minC)+' minutes ago'
	  	}
	  	return 'recent'

	}
	toThos=(num)=>{
		typeof num ==='number'?num=num:num=0;
		  return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
	}
	componentDidMount(){
		const {id}=this.props;
		if(this.props.type==='image'){
			let fakeComment=Array.apply(null,{length:Math.round(Math.random()*100)})
			                .map((a)=>({username:faker.name.findName(),text:faker.lorem.sentence()}));
			    axios.get('https://api.unsplash.com/photos/'+id+'?client_id=8e49ffe791fa753b1d76486427f9f2020b38e6599079c929a49b5ac197767992')
			.then(({data})=>{
				this.comment=fakeComment;
				let info={
					username:data.user.username,
					avatar:data.user.profile_image.small,
					likes:data.likes,
					description:data.description,
					time:data.created_time
				}
				console.log(data)
				this.setState({
					info:info,
			    	comment:this.comment.slice(0,4),
			    	total:this.comment.length,
			    	page:1,
			    	url:data.urls.regular,

				})
			})
		}else if (this.props.type==='video'){
			const promises =[axios.get('https://api.vimeo.com/videos/'+this.props.id+'?access_token=bff4a0260496cc72b64158bc0670c01a'),axios.get('https://api.vimeo.com/videos/'+this.props.id+'/comments?page=1&access_token=bff4a0260496cc72b64158bc0670c01a&per_page=4')]
			Promise.all(promises).then((res)=>{
				
				let { data:{data}}=res[1],
				    info={
						username:res[0].data.user.name,
						avatar:res[0].data.user.pictures.sizes[0].link,
						likes:res[0].data.metadata.connections.likes.total,
						description:res[0].data.description,
						time:res[0].data['created_time']
					},
					comment=data.map((item)=>({username:item.user.name,text:item.text}));
				this.setState({
					info:info,
					comment:comment,
					total:res[1].data.total,
					page:1
					
				})
			})

		}
	}
	loadMoreComment(){
      const {type}=this.props
      this.setState({load:true})
      if( type==='image'){
      	  this.setState((preS)=>({
      	  	comment:this.comment.slice(0,24*preS.page+4),
      	  	page:preS.page+1,
      	  	load:false
      	  }))
      }else if(type==='video'){
      	axios.get('https://api.vimeo.com/videos/'+this.props.id+'/comments?page='+this.state.page+'&access_token=bff4a0260496cc72b64158bc0670c01a&per_page=24')
      	.then(({data:{data}})=>{
      		 	let comment=data.map((item)=>({username:item.user.name,text:item.text}));
      		 	if(this.state.page===1){
      		 	this.setState({
      		 		comment:comment,
      		 		page:2,
      		 		load:false
      		 	})}else{
      		 		this.setState((preS)=>({
      		 			comment:preS.comment.concat(comment),
      		 			page:preS.page+1,
      		 			load:false
      		 		}))
      		 	}
      	})
      }
	}
	render(){
		let height= this.props.screen.toJS().width>=600?337.5:this.props.screen.toJS().width*9/16,
		    {info,comment}=this.state;
		   
		   let comments=comment.map((c,index)=><li key={index}><span className='_cdusname'>{c.username}</span>{c.text}</li>)
		return ( 
		<article className='_cdbg'>
			<header className='_cdhd'>
				<div className='_usava'><div className='_usava2'><img src={info.avatar} /></div></div>
				<div className='_usnm'><h1>{info.username}</h1></div>
			</header>
			<div className='_cdim' >
			    {this.props.type==='image'?<img alt={info.username+"'s media"} style={{width:'100%',height:(height+150)+'px'}} src={this.state.url}/>
			      :<iframe style={{width:'100%',height:height+'px'}} src={"https://player.vimeo.com/video/"+this.props.id+'?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=126886'} 
				 frameBorder="0" title="flow" webkitallowfullscreen='true' mozallowFullscreen='true' allowFullscreen='true'></iframe>
				}
			</div>
			<div className='_cdall'>
				<div className='_cdicon'>
					<Icon size='big' name='heart outline' style={{cursor:'pointer'}}/>
					<Icon style={{paddingLeft:'10px'}} size='big' name='comment outline' style={{cursor:'pointer'}}/>
					<Icon onClick={()=>this.addCollect({id:this.props.id,type:this.props.type})} size='big' name={this.state.isCollect?'bookmark':'remove bookmark'} className='_cdicr' style={{cursor:'pointer'}}/>
				</div>
				<div className='_cdlk'>
					{this.toThos(info.likes)+' likes'}
				</div>
				<div className='_cdcm'>
					<ul>
					   <li><span className='_cdusname'>{info.username}</span>{info.description}</li>
					   {comment.length<this.state.total?(<li onClick={this.loadMoreComment} style={{fontSize:'14px',fontWeight:'400',color:'#999',cursor:'pointer'}}>Load more comment {this.state.load?<Loader size='mini' active inline />:''}</li>):''}
					   	  {comments.reverse()}
					</ul>
				</div>
				<div className='_cdtime'><time>{this.handleTime(info.time)}</time> </div>
				<div className='_cdta'>
				
					<form>
					<textarea placeholder='添加评论...' className='_cdtai' ></textarea>
					</form>
				</div>
				
			</div>
		</article>
		)
	}
}
const mapStatetoProps=(state)=>({
	screen:state.getIn(['input','screen'])
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