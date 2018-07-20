import { Loader} from 'semantic-ui-react'
import React from "react";
import {VideoBoxContainer} from '../../containers/boxContainer'


class VideoExplore extends React.PureComponent {
	constructor(props){
		super(props)
		this.length=0
		this.myref=React.createRef()
		this.handleScroll=this.handleScroll.bind(this)
		this.imgComplete=this.imgComplete.bind(this)
	}

	isScrolling(){
 		const { scrollTop}=document.documentElement;
		const { clientHeight,scrollHeight}=document.documentElement;
		return scrollTop+clientHeight+800>=scrollHeight
 	}
 	handleScroll(){
 		let scrollY=window.scrollY||document.documentElement.scrollTop
 		if(this.lastScroll===scrollY||this.props.isInit){return}else{
 			this.lastScroll=scrollY
 		}
 		
 		if(this.imgComplete()){this.props.finishAdd()}
 		if(this.isScrolling()&&this.lastPage!==this.props.page&&!this.props.isAdding){
 			this.lastPage=this.props.page
 			this.length=this.props.videoresult.length
 			this.props.updateResult(this.props.page)
 		}
 	}
 	componentDidUpdate(){
		let lazyImages = [].slice.call(document.querySelectorAll(".img-small"));
      lazyImages.forEach((lazyImage)=>{
        this.InterSectionObserver.observe(lazyImage)
      })
		this.setState({
			url:this.props.location.pathname.indexOf('/collect')===-1?true:false
		})
	}
	componentDidMount(){
		 let that=this;
    that.InterSectionObserver=new IntersectionObserver((entries)=>{
         
       entries.forEach((entry)=>{
            if(entry.isIntersecting){
                if(entry.target.dataset.src){
                  let lazyImage = entry.target,
                      newImg=new Image();
                      newImg.src=lazyImage.dataset.src;
                      newImg.srcset=lazyImage.dataset.srcset;
                      newImg.onload=()=>{
                         lazyImage.src=lazyImage.dataset.src;
                         lazyImage.srcset=lazyImage.dataset.srcset;
                         lazyImage.classList.remove('img-small');
                     	 lazyImage.classList.add('img-end');
                         
                         that.InterSectionObserver.unobserve(lazyImage);
                      }

                }
            }
       })
    },{threshold:[0,0.25,0.5,0.75,1]})
      let lazyImages = [].slice.call(document.querySelectorAll(".img-small"));
      lazyImages.forEach((lazyImage)=>{
        this.InterSectionObserver.observe(lazyImage)
      })		
		   if(!this.props.isInit){
			this.props.firstResult()
		}
		 this.check = setInterval(this.handleScroll,100)
		
	}
	componentWillUnmount(){
		clearInterval(this.check)
		this.InterSectionObserver.disconnect()
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
		
		if(this.props.videoresult.length>0){
			
      		Load=this.props.videoresult.length>this.length?<Loader  className='myloader' active inline='centered' size='medium'/>:''
      		BoxList=this.props.videoresult.map((i,index)=>(<VideoBoxContainer history={this.props.history} mykey={index} key={index} info={i} />))
		}else{
			Load=''
			 BoxList=<div style={{margin:'0 auto',fontSize:'25px',textAlign:'center'}}>Sorry,we can't find this!</div>
		}
		return (
		<article ref={this.myref}  className='iep1'>
			<h1>Explore</h1>
	{this.props.isInit?(<div className='loaderBox'><Loader className='_ieloader'  active inline='centered' size='medium'></Loader></div>
    ):<div className='videoExplore'>{BoxList}</div>}
     {this.props.isInit?'':Load}
		</article>

		)
	}
}
	
export default VideoExplore 