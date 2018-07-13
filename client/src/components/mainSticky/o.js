import axios from 'axios'
import {withRouter} from 'react-router-dom'
import React from 'react';
class O extends React.PureComponent{
	constructor(props){
		super(props)
      this.state={
      	name:'',
      	time:'',
      	avatar:'',
      }
	}
	componentDidMount(){
		this.Mounted=true
		axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id='+this.props.id+'&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A')
		.then(({data})=>{
			if(!this.Mounted){return}
				
			this.setState({
				name:data.items[0].snippet.channelTitle,
				time:data.items[0].snippet.publishedAt,
				avatar:data.items[0].snippet.thumbnails.high.url,
			})
		})
	}
	componentWillUnmount(){this.Mounted=false}
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
	render(){
		return (
			
			<div onClick={()=>this.props.history.push('/explore/'+this.props.id)} className='_O'>
					<div className='_Oflex'>
					    <div className='_OBG'>
							<div className='_Oimg'>{this.state.avatar?<img alt={`${this.state.name}'s avatar`} src={this.state.avatar}/>:''}</div>
					    </div>
					    <div className='_Oinfo'>
					    	<span>{this.state.name}</span>
					    	{this.state.time?<time>update {this.handleTime(this.state.time)}</time>:''}
					    </div>
					</div>
				</div>)
	}
}
export default withRouter(O)