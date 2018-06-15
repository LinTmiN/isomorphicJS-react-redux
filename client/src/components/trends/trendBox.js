import React from 'react'

import {withRouter} from 'react-router-dom'
class TrendBox extends React.Component{

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
		let {trend,history}=this.props
		console.log(trend)
		return (

			 <div onClick={()=>{history.push(`/detail/${trend.type}/${trend.id}`)}} className='_msif _trendBox'>
				
              	 <div className='_msifim _trendAvatar'> <img alt={`${trend.info.name}'s avatar`} src={trend.info.avatar} /></div>
              	 <div className='_msifus _saf'>
              	    <div className='_msifname '><span className='_trendUser'>{trend.info.name}</span><span className='_trendInfo'>{`的${trend.type==='image'?'照片':'视频'}被你${trend.action}了`}</span> <div className='_msifemail'><span>{this.handleTime(trend.date)}</span></div></div>
              	 </div>
              	 <div className='_trendTarget'>
              	 	<img alt={`你收藏的媒体文件`} src={trend.info.thumbnails} />
              	 </div>
              	 
	        </div>
		)
	}
}



export default withRouter(TrendBox)