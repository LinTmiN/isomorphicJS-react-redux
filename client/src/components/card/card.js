import { Icon,Loader} from 'semantic-ui-react';
import './card.css'
import faker from 'faker'
import React from 'react';
import axios from 'axios'
import WebAPI from '../../utils/WebAPI'
class Card extends React.PureComponent {
	constructor(props){
		super(props)
		this.handleTime=this.handleTime.bind(this)
		this.state={
			comment:[],
			page:1,
			isCollect:false,
			info:{},
			like:0,
		}
		this.addCollect=this.addCollect.bind(this)
		this.loadMoreComment=this.loadMoreComment.bind(this)
		this.toThos=this.toThos.bind(this)
		this.handleTime=this.handleTime.bind(this)
		this.myref=React.createRef()
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
		num=typeof num ==='number'?num:Number(num);
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
		WebAPI.getLike(id).then(({data})=>{
			
			if(data.islike){
				this.setState({like:1})
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
					time:data.created_at
				}
				this.setState({
					info:info,
			    	comment:this.comment.slice(0,25),
			    	page:1,
			    	url:data.urls.regular,

				})
				 onCardInit()
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
				 onCardInit()
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
	render(){
			let { id,type}=this.props,
			     {info,comment}=this.state,		    
			     height= this.props.screen.toJS().width>=600?500:this.props.screen.toJS().width*9/16,
			     comments=comment.map((c,index)=><li key={index}><span className='_cdusname'>{c.username}</span>{c.text}</li>);
			return (
			<React.Fragment>
				{this.props.isCardInit?(
					<div  className='_cdBox'>
						<div className='_cdct'>
						  <div onClick={(e)=>e.stopPropagation()} className='_cdjs2'>
							<article className='_cdati _cdatirs'>
							    <div className='_cdimmd _cdim2rs'>
							       <div className='_cdim2 ' style={type==='image'?{minHeight:'425px'}:{}}>
							       	{type==='image'?<img alt={`${info.username}'s img`} src={this.state.url} />:
							       	<iframe title={`${info.username}'s video`} style={{width:'100%',height:height+'px',}} src={"https://www.youtube.com/embed/"+this.props.id+"?rel=0&showinfo=0&iv_load_policy=3"}
										frameBorder="0" allowFullScreen >
								     </iframe>}
							      	</div>
							    </div>
								<header className='_cdhd1'>
								    <div className='_cdhd2'>
									<div className='_cdhdim'><img alt={`${info.username}'s avatar`} src={info.avatar} /></div>
									<div className='_cdusname1'><h1 >{info.username}<span> ·关注</span></h1></div>
									</div>
								</header>
								<div className='_ncdall'>
									<div className='_ncdcm'>
										<ul>
										   <li><span className='_cdusname'>{info.username}</span>{info.description}</li>
										   {this.state.page?(<li onClick={this.loadMoreComment} style={{fontSize:'14px',fontWeight:'400',color:'#999',cursor:'pointer'}}>Load more comment {this.state.load?<Loader size='mini' active inline />:''}</li>):''}
										   	  {comments.reverse()}
										</ul>
									</div>
									
									 <div className='_ncdicon'>
										<Icon onClick={()=>this.togglelike({id:id,type:type})} size='big' name={this.state.like?'heart':'heart outline'} style={{cursor:'pointer',color:this.state.like?'#FB4E4E':'black'}}/>
										<Icon onClick={()=>this.myref.current.focus()} style={{paddingLeft:'10px'}} size='big' name='comment outline' style={{cursor:'pointer'}}/>
										<Icon onClick={()=>this.addCollect({id:this.props.id,type:this.props.type})} size='big' name={this.state.isCollect?'bookmark':'remove bookmark'} className='_ncdicr' style={{cursor:'pointer'}}/>
									</div>
									<div className='_ncdlk'>
										{this.toThos(info.likes+this.state.like)+' likes'}
									</div>
									<div className='_ncdtime'><time>{this.handleTime(info.time)}</time> </div>
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
						  </div>
						</div>
					</div>):''}
			</React.Fragment>
			)}
	
}
export default Card
