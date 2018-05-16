import React from "react";
import "./explore.css";
import {Dimmer ,Segment,Header,Icon,Image} from 'semantic-ui-react'
import ImgBox from '../imgBox'
import VideoBox from '../videoBox'

class ImgExplore extends React.Component {
	constructor(props){
		super(props)
		this.myref=React.createRef()
	}
	onScrollhandler(e){
		
		const {bottom}=this.myref.current.getBoundingClientRect()
		const scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		const bodyH=document.body.clientHeight;
			if(bottom-(scrollTop+bodyH)<-100){
			this.props.updateResult()
		}

	}
	componentDidMount(){		
		const {bottom}=this.myref.current.getBoundingClientRect()
		const scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		const bodyH=document.body.clientHeight;
		if(bottom-(scrollTop+bodyH/2)<500){
			this.props.firstResult()
		}
		window.addEventListener('scroll',this.onScrollhandler.bind(this))
	}
	componentWillUnmount(){
		window.removeEventListener('scroll',this.onScrollhandler.bind(this))

	}
	shouldComponentUpdate(nS,nP){
		if(this.state!=nS||this.props!=nP){
			return true
		}else{
			return false
		}
	}
	render(){
		console.log(this.props.videoresult)
	let BoxList;
this.props.searchtype==='video'?BoxList=this.props.videoresult.map((i,index)=>(<VideoBox key={index} info={i} />)):BoxList=this.props.imageresult.map((i,index)=>(<ImgBox key={index} info={i}/>))
		
		return (
		<article ref={this.myref}  className='iep1'>
			<h1>Explore</h1>
		 	<div className={this.props.searchtype==='video'?'videoExplore':'imgExplore'}>
		 			{BoxList}
		  	</div>
		</article>

		)
	}
}
// const ImgExplore = ({results}) => {
//     const imgBoxList=results.map((i,index)=>(<ImgBox key={index} info={i}/>))
// 	return(
// 	<article ref={this.myref} className='iep1'>
// 		<h1>Explore</h1>
// 	 	<div className='imgExplore'>
// 	 		{imgBoxList}
// 	  	</div>
// 	</article>
// 	)
// }

export default ImgExplore;
