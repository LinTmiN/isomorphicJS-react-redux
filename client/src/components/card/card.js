import { Image ,Icon} from 'semantic-ui-react';
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
			page:1
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
	componentWillMount(){
		
		if(this.props.type==='image'){
			
			this.comment=Array.apply(null,{length:Math.round(Math.random()*90+10)}).map((l,index)=><li key={index}><span>{faker.name.findName()}</span>{faker.lorem.sentence()}</li>)
			this.setState({
			comment:this.comment.slice(0,25),
			page:1
		})
			this.props.onCardInit()
		}
		else if (this.props.type==='video'){
			const videoId=this.props.mykey
		    
			axios.get('https://api.vimeo.com/videos/'+videoId+'?access_token=bff4a0260496cc72b64158bc0670c01a').then(({data})=>{
				 this.info=data
				 this.props.onCardInit()			
			})
			
			this.props.getComment(videoId,1).then((data)=>{
				
				this.len=data.data.total
				this.comment=data.data.data.map((c,index)=>{
					return (<li key={index}><span>{c.user.name}</span>{c.text}</li>)
				})
				this.setState({
					comment:this.comment,
					page:1
				})
			})
			
			
		}


	}
	imageLoadmore=(e)=>{
		e.stopPropagation()
		this.setState((preS)=>({
			page:preS.page+1,
			comment:this.comment.slice(0,(preS.page+1)*25)
	    }))
	}
	videoLoadmore=(e)=>{
		e.stopPropagation()
		const videoId=this.props.videoresult[this.props.mykey].uri.replace('/videos/','')
		this.props.getComment(videoId,this.state.page+1).then((data)=>{
				let newResult=data.data.data.map((c,index)=><li key={Math.round(Math.random()*100+25)+index+'1'}><span>{c.user.name}</span>{c.text}</li>)
				 this.setState((preS)=>({
				 	comment:preS.comment.concat(newResult),
				 	page:preS.page+1
				 }))
		})
	}
	render(){
			const type=this.props.type

			return (
				<div>
				{this.props.isCardInit?(<div onClick={(e)=>e.stopPropagation()}  className='dBox' >
				<div className='imgCG'>
					{type==='image'?(<img src={'https://pixabay.com/get/'+this.props.mykey+'.jpg'} />):(<iframe src={"https://player.vimeo.com/video/"+this.props.mykey+"?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=126886"} className='video' width="650" height="500" frameBorder="0" title="flow" webkitallowfullscreen='true' mozallowFullscreen='true' allowFullscreen='true'></iframe>)}
				</div>	
				<div className='commentBox'>
					<div className='_usif'>
						<Image className='_usim' size='mini' avatar src={type==='image'?faker.image.avatar():this.info.user.pictures.sizes[2].link} />
						<h1> {type==='image'?faker.name.findName():this.info.user.name} <span> · </span> <a href='#'>关注</a></h1>
						<h3>{faker.name.jobTitle()}</h3>
					</div>
					<div className='_usic'>
						<Icon  style={{margin:'0 10px',cursor:'pointer'}} size='big' name='heart outline'/>
						<Icon  style={{cursor:'pointer'}} size='big' name='comment outline'/>
						<Icon style={{float:'right',marginRight:'10px',cursor:'pointer'}} size='big' name='remove bookmark'/>
						<span className='_uslk'>{type==='image'?faker.random.number()+'likes':this.info.stats.plays+'plays'}</span>
						<span className='_ustm'>{type==='image'?this.handleTime(faker.date.past()):this.handleTime(this.info['created_time'])}</span>
					</div>	
					<div className='_uscm'>

						<ul>
						<li><span>{type==='image'?faker.name.findName():this.info.user.name}</span>{type==='image'?faker.lorem.sentence():this.info.description}</li>
							{type==='image'?
						(this.state.comment.length<this.comment.length?
							<li><span onClick={this.imageLoadmore} style={{fontWeight:'400',color:'#999',cursor:'pointer'}}>Load more comments</span></li>
						:'')
						:(this.state.comment.length<this.len?
						<li><span onClick={this.videoLoadmore} style={{fontWeight:'400',color:'#999',cursor:'pointer'}}>Load more comments</span></li>
						:'')
						}
						{this.state.comment.reverse()}
						</ul>
					</div>
					<section className='_usip'>
						<form>
						<textarea placeholder='Add a comment...'></textarea>
						</form>
						<Icon size='large' style={{marginRight:'15px',color:'#262626',float:'right',fontWeight:'400'}} name='ellipsis horizontal'/>
					</section>
				</div>
			</div>):''}
			</div>)
		
	}
}
export default Card
