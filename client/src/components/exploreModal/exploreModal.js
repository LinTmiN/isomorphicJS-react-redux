import React from 'react';
import ReactDOM from 'react-dom'
import './exploreModal.css'
import {Icon } from 'semantic-ui-react'
import {connect} from 'react-redux'
import axios from 'axios'
class ExploreModal extends React.PureComponent{
	constructor(props){
		super(props)
	   this.state={
      	name:'',
      	time:'',
      	avatar:'',
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
   componentDidMount(){
   	this.Mounted=true
   	axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id='+this.props.match.params.id+'&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A')
   	.then(({data})=>{
   		axios.get('https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id='+data.items[0].snippet.channelId+'&fields=items%2Fsnippet%2Fthumbnails%2Fmedium&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A')
   		.then(({data:mydata})=>{
   			if(!this.Mounted){return}
			this.setState({
				name:data.items[0].snippet.channelTitle,
				time:data.items[0].snippet.publishedAt,
				avatar:mydata.items[0].snippet.thumbnails.medium.url,
			})
   		})
			
		})
   }
	render(){
		const {name,time,avatar} = this.state
		return (
			
				 <section className='_exml' style={{height:this.props.screen.toJS().height}}>
				 	 <div className='_exmlmain'>
				 	 	<section className='_3dex'>
				 	 		<header className='_3dexuser'>
				 	 			<div className='_cdhd2 _3dhd'>
				 	 				<div className='_cdhdim _3davatar'><img  src={avatar} /></div>
									<div className='_cdusname1 _3dname'><h1 >{name}<span>{this.handleTime(time)}</span><Icon style={{float:'right'}}  name='ellipsis horizontal'/></h1></div>
				 	 			</div>
				 	 		</header>
				 	 		<div className='_3dembed' >
				 	 		     <button className='_3dbutton1'><span name='remove'>X</span></button>
					 	 		<iframe style={{width:'100%',height:'100%',}} src={'https://www.youtube.com/embed/'+this.props.match.params.id+'?rel=0&showinfo=0&iv_load_policy=3'}
								 frameBorder="0" allowFullScreen />
								  <button className='_3dbutton1 _3dbutton2'><span  name='chevron circle right'>＞</span></button>   
								   <button className='_3dbutton1 _3dbutton3'><span name='chevron circle left'>＜</span></button> 
				 	 		</div>
				 	 	</section>
				 	 </div>
				 </section>
			
			)
		
	}
}

export default connect((state)=>({
	screen:state.getIn(['input','screen']),
	collect:state.getIn(['user','collect']).toJS().filter((a)=>a.type==='video').map((a)=>a.id)
}))(ExploreModal)