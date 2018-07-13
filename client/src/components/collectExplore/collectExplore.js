import React from 'react'
import CollectCard from '../collectCard'

class CollectExplore extends React.PureComponent{
	constructor(props){
		super(props)
		this.state={
			boxList:[]
		}
		
	}

	componentDidMount(){
		 let that=this;
	

    if(window.IntersectionObserver){
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
        },{threshold:[0,0.25,0.4,0.5,0.6,0.75,1]});

          let lazyImages = [].slice.call(document.querySelectorAll(".img-small"));
          lazyImages.forEach((lazyImage)=>{
            this.InterSectionObserver.observe(lazyImage)
          })
      }
		
	}
	componentDidUpdate(){
	 if(this.InterSectionObserver){
  	 let lazyImages = [].slice.call(document.querySelectorAll(".img-small"));
      lazyImages.forEach((lazyImage)=>{
        this.InterSectionObserver.observe(lazyImage)
      })
 	 }	
	}
	componentWillUnmount(){
		if(this.InterSectionObserver){
		this.InterSectionObserver.disconnect()
	}
	}
	render(){
		let boxList=this.props.collect.toJS().map((item,index)=>{

			return <CollectCard index={index} key={item.id} id={item.id} type={item.type}/>
		})
		return (
				
				<section className='_cect'>
				    {boxList.length===0?<span style={{fontSize:'25px',color:'#999',marginTop:'80px'}}>你还没有任何收藏</span>:boxList.reverse()}
				</section>
			
		)
	}
}

export default CollectExplore