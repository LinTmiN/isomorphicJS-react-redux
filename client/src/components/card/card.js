import { Image ,Icon,Loader} from 'semantic-ui-react';
import './card.css'
import faker from 'faker'
import React from 'react';
import axios from 'axios'

class Card extends React.Component {
	constructor(props){
		super(props)
		this.handleTime=this.handleTime.bind(this)
		this.state={
			comment:[],
			page:1,
			isCollect:false,
			info:{}
		}
		this.addCollect=this.addCollect.bind(this)
		this.loadMoreComment=this.loadMoreComment.bind(this)
		this.toThos=this.toThos.bind(this)
		this.handleTime=this.handleTime.bind(this)
		
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
		if(type==='image'){
			let fakeComment=Array.apply(null,{length:Math.round(Math.random()*100)})
			                .map((a)=>({username:faker.name.findName(),text:faker.lorem.sentence()}));
			axios.get('https://api.unsplash.com/photos/'+id+'?client_id=8e49ffe791fa753b1d76486427f9f2020b38e6599079c929a49b5ac197767992')
			.then(({data})=>{
			   this.comment=fakeComment
				let info={
					username:data.user.username,
					avatar:data.user.profile_image.small,
					likes:data.likes,
					description:data.description,
					time:data.created_time
				}
				this.setState({
					info:info,
			    	comment:this.comment.slice(0,25),
			    	total:this.comment.length,
			    	page:1,
			    	url:data.urls.regular,

				})
				 onCardInit()
			})
			 
		}else if (type==='video'){
			const promises =[axios.get('https://api.vimeo.com/videos/'+id+'?access_token=bff4a0260496cc72b64158bc0670c01a'),axios.get('https://api.vimeo.com/videos/'+this.props.id+'/comments?page=1&access_token=bff4a0260496cc72b64158bc0670c01a&per_page=25')]
			Promise.all(promises).then((res)=>{
				
				let { data:{data}}=res[1],
				    info={
						username:res[0].data.user.name,
						avatar:res[0].data.user.pictures.sizes[1].link,
						likes:res[0].data.metadata.connections.likes.total,
						description:res[0].data.description,
						time:res[0].data['created_time'],

					},
					comment=data.map((item)=>({username:item.user.name,text:item.text}));
				this.setState({
					info:info,
					comment:comment,
					total:res[1].data.total,
					page:1
					
				})
				 onCardInit()
			})

		}
	}
	loadMoreComment(){
      const {type}=this.props
      this.setState({load:true})
      if( type==='image'){
      	  this.setState((preS)=>({
      	  	comment:this.comment.slice(0,25*(preS.page+1)),
      	  	page:preS.page+1,
      	  	load:false
      	  }))
      }else if(type==='video'){
      	axios.get('https://api.vimeo.com/videos/'+this.props.id+'/comments?page='+(this.state.page+1)+'&access_token=bff4a0260496cc72b64158bc0670c01a&per_page=24')
      	.then(({data:{data}})=>{
      		 	let comment=data.map((item)=>({username:item.user.name,text:item.text}));
      		 	
      		 		this.setState((preS)=>({
      		 			comment:preS.comment.concat(comment),
      		 			page:preS.page+1,
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
	render(){
			let { type}=this.props,
			     {info,comment}=this.state,
			     width=this.props.screen.toJS().width;
			     
			let height= this.props.screen.toJS().width>=600?337.5:this.props.screen.toJS().width*9/16;
			let comments=comment.map((c,index)=><li key={index}><span className='_cdusname'>{c.username}</span>{c.text}</li>)
			return (
			<React.Fragment>
				{this.props.isCardInit?(
					<div  className='_cdBox'>
						<div className='_cdct'>
						  <div onClick={(e)=>e.stopPropagation()} className='_cdjs2'>
							<article className='_cdati _cdatirs'>
							    <div className='_cdimmd _cdim2rs'>
							       <div className='_cdim2 ' style={type==='image'?{minHeight:'425px'}:{}}>
							       	{type==='image'?<img src={this.state.url} />:
							       	<iframe style={{width:'100%',height:height+'px'}} src={"https://player.vimeo.com/video/"+this.props.id+'?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=126886'} 
										 frameBorder="0" title="flow" webkitallowfullscreen='true' mozallowFullscreen='true' allowFullscreen='true'>
								     </iframe>}
							      	</div>
							    </div>
								<header className='_cdhd1'>
								    <div className='_cdhd2'>
									<div className='_cdhdim'><img src={info.avatar} /></div>
									<div className='_cdusname1'><h1 >{info.username}<span> ·关注</span></h1></div>
									</div>
								</header>
								<div className='_ncdall'>
									<div className='_ncdcm'>
										<ul>
										   <li><span className='_cdusname'>{info.username}</span>{info.description}</li>
										   {comment.length<this.state.total?(<li onClick={this.loadMoreComment} style={{fontSize:'14px',fontWeight:'400',color:'#999',cursor:'pointer'}}>Load more comment {this.state.load?<Loader size='mini' active inline />:''}</li>):''}
										   	  {comments.reverse()}
										</ul>
									</div>
									
									 <div className='_ncdicon'>
										<Icon size='big' name='heart outline' style={{cursor:'pointer'}}/>
										<Icon style={{paddingLeft:'10px'}} size='big' name='comment outline' style={{cursor:'pointer'}}/>
										<Icon onClick={()=>this.addCollect({id:this.props.id,type:this.props.type})} size='big' name={this.state.isCollect?'bookmark':'remove bookmark'} className='_ncdicr' style={{cursor:'pointer'}}/>
									</div>
									<div className='_ncdlk'>
										{this.toThos(info.likes)+' likes'}
									</div>
									<div className='_ncdtime'><time>{this.handleTime(info.time)}</time> </div>
									<div className='_ncdta'>
									
										<form>
										<textarea placeholder='添加评论...' className='_cdtai' ></textarea>
										</form>
									</div>
									
								</div>
							</article>
						  </div>
						</div>
					</div>):''}
			</React.Fragment>
			)}
	
}
export default Card
