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
 		if(this.isScrolling()&&!this.props.isInit){
 			
 			this.props.updateResult()
 		}
 	}
	componentDidMount(){		
		const { scrollTop}=document.documentElement;
		const { clientHeight,scrollHeight}=document.documentElement;
			if(scrollTop+clientHeight+40>=scrollHeight){
				if(this.props.isInit){return}
				else if(this.props.isAdding){return }
				else if(!this.imgComplete()){return}
					console.log('ll: '+scrollTop+clientHeight+40+'ss: ' +scrollHeight)
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
		
		console.log('is adding'+this.props.isAdding)
		let BoxList=this.props.imageresult.map((i,index)=>(<ImgBox key={index} info={i}/>))

		return (
		<article ref={this.myref}  className='iep1'>
			<h1>Explore</h1>
		{this.props.isInit?( 
      
        <Loader style={{marginTop:'150px'}} active inline='centered' size='large'>Loading</Loader>
     

      
    ):<div className='imgExplore'>
					{BoxList}

		  	</div>}	
		   {this.props.isInit?'':<Loader style={{marginBottom:'80px'}} active inline='centered' size='medium'/>}
		 	 
		</article>

		)
	}
}
export default ImgExplore;