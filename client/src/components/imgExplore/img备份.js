import React from "react";
import "./explore.css";
import {Dimmer ,Segment,Header,Icon,Image,Loader} from 'semantic-ui-react'
import ImgBox from '../imgBox'
import VideoBox from '../videoBox'

class ImgExplore extends React.Component {
	constructor(props){
		super(props)
		this.myref=React.createRef()
		this.imgComplete=this.imgComplete.bind(this)
	}
	onScrollhandler(e){
		let lastCalledAt=new Date().getTime();
		const { scrollTop}=document.documentElement;
		const { clientHeight,scrollHeight}=document.documentElement;
		console.log('ST: '+scrollTop+'cH: '+clientHeight+'ScrollH: '+scrollHeight)
		const {bottom}=this.myref.current.getBoundingClientRect()
		
		const bodyH=document.documentElement.clientHeight;
			if(scrollTop+clientHeight+40>=scrollHeight){
				if(this.props.isInit){return}else if(this.props.isAdding){return }else if(!this.imgComplete()){return}
			this.props.updateResult()
		}

	}
	
	componentDidMount(){		
		const { scrollTop}=document.documentElement;
		const { clientHeight,scrollHeight}=document.documentElement;
		console.log('ST: '+scrollTop+'cH: '+clientHeight+'ScrollH: '+scrollHeight)
		const {bottom}=this.myref.current.getBoundingClientRect()
		
		const bodyH=document.documentElement.clientHeight;
			if(scrollTop+clientHeight+40>=scrollHeight){
				if(this.props.isInit){return}else if(this.props.isAdding){return }else if(!this.imgComplete()){return}
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
		
		console.log(this.props.isAdding)
		let BoxList=this.props.imageresult.map((i,index)=>(<ImgBox key={index} info={i}/>))

		return (
		<article ref={this.myref}  className='iep1'>
			<h1>Explore</h1>
		{this.props.isInit?( 
      
        <Loader style={{marginTop:'150px'}} active inline='center' size='large'>Loading</Loader>
     

      
    ):<div className='imgExplore'>
					{BoxList}

		  	</div>}	
		     {this.props.isAdding?<Loader style={{marginBottom:'80px'}} active inline='center' size='medium'/>:''}
		 	 
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
