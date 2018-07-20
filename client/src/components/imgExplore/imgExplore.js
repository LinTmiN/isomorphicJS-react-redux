import React from "react";
import "./explore.css";
import { Loader} from 'semantic-ui-react'
import {ImgBoxContainer} from '../../containers/boxContainer'

class ImgExplore extends React.PureComponent {
	constructor(props){
		super(props)
		this.myref=React.createRef()
		this.imgComplete=this.imgComplete.bind(this)
		this.handleScroll=this.handleScroll.bind(this)

	}
 	isScrolling(){
 		const { scrollTop}=document.documentElement;
		const { clientHeight,scrollHeight}=document.documentElement;
		return scrollTop+clientHeight+200>=scrollHeight
 	}
 	handleScroll(){
 		let scrollY=window.scrollY?window.scrollY:document.documentElement.scrollTop;
 		if(this.lastScroll===scrollY||this.props.isInit){return}else{
 			this.lastScroll=scrollY	
 		}
 		
 		if(this.imgComplete()){this.props.finishAdd()}
 		if(this.isScrolling()&&this.lastPage!==this.props.page&&!this.props.isAdding){
 			this.lastPage=this.props.page
 			
 			this.length=this.props.imageresult.length
 			this.props.updateResult(this.props.page)
 		}
 	}
	componentDidMount(){		
		 let that=this;
    that.InterSectionObserver=new IntersectionObserver((entries)=>{
         
       entries.forEach((entry)=>{
            if(entry.isIntersecting){
                if(entry.target.dataset.src){
                  let lazyImage = entry.target,
                      newImg=new Image(),
                      src=lazyImage.dataset.src,
                      srcset=lazyImage.dataset.srcset;
                  newImg.src=src;
                  newImg.srcset=srcset
                  newImg.onload=()=>{
                     lazyImage.src=src
                     lazyImage.srcset=srcset
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
	componentDidUpdate(){
		let lazyImages = [].slice.call(document.querySelectorAll(".img-small"));
      lazyImages.forEach((lazyImage)=>{
        this.InterSectionObserver.observe(lazyImage)
      })
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
		let BoxList,Load,List,
			{imageresult,history}=this.props;
		if(imageresult.length>0){
			
			Load=imageresult.length>this.length?<Loader className='myloader' active inline='centered' size='medium'/>:'';
		    List=imageresult.map((i,index)=>(<ImgBoxContainer history={history} key={index} info={i}/>))
		 	BoxList=List.reduce((a,ImgBox,index)=>{
		 		let increase=100*imageresult[index].height/imageresult[index].width.toFixed(2);

		 		if(index<3){
		 			
		 			a[index].push(ImgBox)
		 			a[index].height = increase
		 			return a
		 		}else{
		 			let min=Math.min.apply(null,[a[0].height,a[1].height,a[2].height])
		 			
		 			if(a[0].height===min){
		 				a[0].push(ImgBox)
		 				a[0].height +=increase
		 				
		 			}else if(a[1].height===min){
		 				a[1].push(ImgBox)
		 				a[1].height +=increase
		 			
		 			}else if(a[2].height===min){
		 				a[2].push(ImgBox)
		 				a[2].height +=increase
		 				
		 			}

		 			return a
		 		}
		 	},[[],[],[]])
		 }else{
		 	 Load=''
			 BoxList=<div style={{margin:'0 auto',fontSize:'25px',textAlign:'center'}}>抱歉，搜索不到</div>
		 }
		return (
			<React.Fragment>
		<article ref={this.myref}  className='iep1'>
			<h1>Explore</h1>
		{this.props.isInit?( 
      
        <div className='loaderBox'><Loader className='_ieloader' style={{margin:'50px auto'}} active inline='centered' size='medium'></Loader></div>
     

      
    ):<div style={{height:'auto'}} className='imgExplore'>
					<div  ref={(r)=>this.listOne=r} className='_exRow'>{BoxList[0]}</div>
					<div ref={(r)=>this.listTwo=r} className='_exRow'>{BoxList[1]}</div>
					<div  ref={(r)=>this.listThree=r} className='_exRow'>{BoxList[2]}</div>
		  	</div>}	
		   
		 	 
		</article>
			{this.props.isInit?'':Load}
			</React.Fragment>
		)
	}
}
export default ImgExplore;
