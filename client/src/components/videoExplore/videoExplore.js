import { Loader} from 'semantic-ui-react'
import React from "react";
import {VideoBoxContainer} from '../../containers/boxContainer'
import faker from 'faker'

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
		if(this.state!==nS||this.props!==nP){
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
		let BoxList,Load
		if(this.props.videoresult.length>0){
      		Load=this.props.videoresult.length<this.props.total?<Loader style={{marginBottom:'100px'}} active inline='centered' size='medium'>bbbb</Loader>:'end'
      		BoxList=this.props.videoresult.map((i,index)=>(<VideoBoxContainer history={this.props.history} mykey={index} key={index} info={i} />))
		}else{
			Load=''
			 BoxList=<div style={{margin:'0 auto',fontSize:'25px',textAlign:'center'}}>Sorry,we can't find this!</div>
		}
		return (
		<article ref={this.myref}  className='iep1'>
			<h1>Explore</h1>
	{this.props.isInit?(<Loader className='_ieloader' style={{margin:'50px auto'}} active inline='centered' size='medium'></Loader>
    ):<div className='videoExplore'>{BoxList}</div>}
     {this.props.isInit?'':Load}
		</article>

		)
	}
}
	
export default VideoExplore 