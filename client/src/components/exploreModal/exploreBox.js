import React from 'react'
import {Icon,Embed } from 'semantic-ui-react'
import axios from 'axios'

import {connect} from 'react-redux'
class ExploreBox extends React.PureComponent{
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
	}
	componentWillUnmount(){
	   	this.Mounted=false
  
   }
	render(){
			
    		const {fetchCollect,collect,match,handle,history}=this.props
    	  let index=collect.indexOf(match.params.id)
		let info=fetchCollect.toJS()[index]
		return (
			<section  className='_3dex'>
	 	 		<header className='_3dexuser'>
	 	 			<div className='_cdhd2 _3dhd'>
	 	 				<div className='_cdhdim _3davatar'><img  src={info?info.avatar:""} /></div>
						<div className='_cdusname1 _3dname'><h1 >{info?info.name:""}<span>{this.handleTime(info?info.time:"")}</span><Icon style={{float:'right'}}  name='ellipsis horizontal'/></h1></div>
	 	 			</div>
	 	 		</header>
	 	 		<div  className='_3dembed' >
	 	 		     <button onClick={()=>history.push('/collect',{keepTop:true})} className='_3dbutton1'><span name='remove'>X</span></button>
		 	 		   <div style={{width:'100%',height:'100%',display:'flex'}}><iframe style={{width:'100%',height:'100%',}} src={"https://www.youtube.com/embed/"+match.params.id+"?rel=0&showinfo=0&iv_load_policy=3"}
				   		frameBorder="0" allowFullScreen ></iframe></div>
					  <button  onClick={()=>{
					  
					  	let index=collect.indexOf(match.params.id),next=collect[(index+1)%collect.length]
					  		handle('rtl',next)
					  	}}className='_3dbutton1 _3dbutton2'><span  name='chevron circle right'>＞</span></button>   
					   <button onClick={()=>{
					   	let index=collect.indexOf(match.params.id),prev=collect[(index-1+collect.length)%collect.length];
					   		handle('ltr',prev)
					   }} className='_3dbutton1 _3dbutton3'><span name='chevron circle left'>＜</span></button> 
	 	 		</div>
	 		</section>
		)
	}
}
export default connect(
	(state)=>({
		collect:state.getIn(['user','collect']).toJS().filter((a)=>a.type==='video').map((a)=>a.id),
		fetchCollect:state.getIn(['user','fetchCollect'])
	})
)(ExploreBox);


 