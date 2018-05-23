import React from 'react';
import {Image,Icon} from 'semantic-ui-react';
import './videoBox.css'
class VideoBox extends React.Component{
	constructor(props){
		super(props)
			this.state={
				showInfo:false,
				imgOnload:false
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
	componentDidMount(){
		
		this.myref.current.onload=()=>{
			
			this.setState({imgOnload:true})}
	}

	render(){	
	    const info=this.props.info
	   const {history,mykey}	=this.props
		return (
 			<div onClick={()=>{
 					this.props.isCardInit()
 					history.push('/search/video/'+info.uri.replace('/videos/',''),{top:document.documentElement.scrollTop})
 					}
 			} onMouseEnter={this.handleShow} onMouseLeave={this.handleShow} className='videoItem'>
 				 <div className='conss'>
 				 
 				 <img  ref={this.myref} alt='somthing' src={info.pictures.sizes[2].link}/>
 				{this.state.showInfo==true?(<div className='videomodal'>
 					<Icon style={{marginTop:'25%'}} name='play' size='huge'/>
 				    <div className='videoinfo'>
 					<span >{this.handleTime(info['created_time'])}</span>
 					<span><Icon name='heart'/>{info.metadata.connections.likes.total}</span>
 					<span><Icon name='comment'/>{info.metadata.connections.comments.total}</span>
 					</div>
 				</div>):''}
 				</div>
 				 <h1 className='videotitle'>{info.name}</h1>
 				<h2 className='videosubtitle'><Image  src={info.user.pictures.sizes[0].link} avatar />{info.user.name+' | '+info.stats.plays}</h2>
 			</div>

 
		)
	}
	

}
export default VideoBox

			

