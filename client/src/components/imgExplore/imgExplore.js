import React from "react";
import "./explore.css";
import { Loader} from 'semantic-ui-react'
import {ImgBoxContainer} from '../../containers/boxContainer'
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
		return scrollTop+clientHeight+1200>=scrollHeight
 	}
 	handleScroll(){
 		let scrollY=window.scrollY||document.documentElement.scrollTop
 		if(this.lastScroll===scrollY){return}else{
 			this.lastScroll=scrollY	
 		}
 		console.log('ssaffc')
 		console.log(this.imgComplete())
 		if(this.imgComplete()){this.props.finishAdd()}
 		if(this.isScrolling()&&this.lastPage!==this.props.page&&!this.props.isAdding){
 			this.lastPage=this.props.page
 			console.log('sc')
 			this.length=this.props.imageresult.length
 			this.props.updateResult(this.props.page)
 		}
 	}
	componentDidMount(){		
		// const { scrollTop}=document.documentElement;
		// const { clientHeight,scrollHeight}=document.documentElement;
		// 	if(scrollTop+clientHeight+40>=scrollHeight){
			this.props.firstResult()
		// }
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
	
	render(){
		let BoxList,Load
		if(this.props.imageresult.length>0){
			console.log(this.length+'sfsf'+this.props.imageresult.length)
			Load=this.length!==this.props.imageresult.length?<Loader className='myloader' active inline='centered' size='medium'/>:'end'
		     BoxList=this.props.imageresult.map((i,index)=>(<ImgBoxContainer history={this.props.history}   key={index} info={i}/>))
		 }else{
		 	Load=''
			 BoxList=<div style={{margin:'0 auto',fontSize:'25px',textAlign:'center'}}>Sorry,we can't find this!</div>
		 }
		return (
		<article ref={this.myref}  className='iep1'>
			<h1>Explore</h1>
		{this.props.isInit?( 
      
        <Loader className='_ieloader' style={{margin:'50px auto'}} active inline='centered' size='medium'></Loader>
     

      
    ):<div className='imgExplore'>
					{BoxList}

		  	</div>}	
		   {this.props.isInit?'':Load}
		 	 
		</article>

		)
	}
}
export default ImgExplore;
