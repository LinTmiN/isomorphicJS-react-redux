import {Dimmer ,Segment,Header,Icon,Image,Loader} from 'semantic-ui-react'
import React from "react";
import VideoBox from '../videoBox'


class VideoExplore extends React.Component {
	constructor(props){
		super(props)
		this.myref=React.createRef()
		this.handleScroll=this.handleScroll.bind(this)
	}

	isScrolling(){
 		const { scrollTop}=document.documentElement;
		const { clientHeight,scrollHeight}=document.documentElement;
		return scrollTop+clientHeight+40>=scrollHeight
 	}
 	handleScroll(){
 		if(this.lastScroll===window.scrollY){return}else{
 			this.lastScroll=window.scrollY
 		}
 		
 		if(this.isScrolling()&&!this.props.isInit&&!this.props.isAdding){
 			
 			this.props.updateResult()
 		}
 	}
	componentDidMount(){		
		const { scrollTop}=document.documentElement;
		const { clientHeight,scrollHeight}=document.documentElement;
		if(scrollTop+clientHeight+40>=scrollHeight){
				if(this.props.isInit){return}
				else if(this.props.isAdding){ return }
			
			this.props.firstResult()
		}
		 this.check = setInterval(this.handleScroll,100)
		
	}
	componentWillUnmount(){
		clearInterval(this.check)

	}
	shouldComponentUpdate(nS,nP){
		if(this.state!=nS||this.props!=nP){
			return true
		}else{
			return false
		}
	}
	imgComplete(){
		const imgs=this.myref.current.querySelectorAll('img')
		for (let i=0;i<imgs.length;i++){
			const img=imgs[i];
			if(!img.complete){
				return false
			}
		}
		return true
	}
	componentDidUpdate(){
		if(this.imgComplete){
			this.props.finishAdd()
		}
	}
	render(){
		console.log(this.props.history)
		let BoxList
		if(this.props.videoresult){
      BoxList=this.props.videoresult.map((i,index)=>(<VideoBox key={index} info={i} />))
		}else{
			 BoxList=''
		}
		return (
		<article ref={this.myref}  className='iep1'>
			<h1>Explore</h1>
	{this.props.isInit?(<Loader style={{marginTop:'150px'}} active inline='centered' size='large'>Loading</Loader>
    ):<div className='videoExplore'>{BoxList}</div>}
     {this.props.isInit?'':<Loader style={{marginBottom:'80px'}} active inline='centered' size='medium'/>}
		</article>

		)
	}
}
	
export default VideoExplore 