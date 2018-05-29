import React from 'react';
import {Icon} from 'semantic-ui-react';
import './videoBox.css'
import axios from 'axios'
class VideoBox extends React.Component{
	constructor(props){
		super(props)
			this.state={
				showInfo:false,
				imgOnload:false,
				statistics:{},
			}
			this.handleTime=this.handleTime.bind(this)
			this.myref=React.createRef()
	}
	handleShow=()=>this.setState((preS)=>({showInfo:!this.state.showInfo}))
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
		const {id:{videoId}}=this.props.info
		axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id='+videoId+'&fields=items%2Fstatistics&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A').then(({data})=>{
				
				this.setState({
					statistics:data.items[0].statistics
				})
		})
		this.myref.current.onload=()=>{
			
			this.setState({imgOnload:true})}
	}

	render(){	
	   const {history,info}	=this.props
		return (
 			<div onClick={()=>{
 					this.props.isCardInit()
 					history.push('/search/video/'+info.id.videoId,{top:document.documentElement.scrollTop})
 					}
 			} onMouseEnter={this.handleShow} onMouseLeave={this.handleShow} className='videoItem'>
 				 <div className='conss'>
 				 
 				 <img  ref={this.myref} alt='somthing' src={info.snippet.thumbnails.medium.url}/>
 				{this.state.showInfo===true?(<div className='videomodal'>
 					<Icon style={{marginTop:'25%'}} name='play' size='huge'/>
 				    <div className='videoinfo'>
 					<span >{this.handleTime(info.snippet.publishedAt)}</span>
 					<span><Icon name='heart'/>{this.toThos(this.state.statistics.likeCount)}</span>
 					<span><Icon name='comment'/>{this.toThos(this.state.statistics.commentCount)}</span>
 					</div>
 				</div>):''}
 				</div>
 				 <h1 className='videotitle' title={info.snippet.title}>{info.snippet.title}</h1>
 				<h2  className='videosubtitle'>{info.snippet.channelTitle+' | '+this.toThos(this.state.statistics.viewCount)}</h2>
 			</div>

 
		)
	}
	

}
export default VideoBox

			

