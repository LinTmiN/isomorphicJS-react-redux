import React from 'react';
import {Icon} from 'semantic-ui-react';
import './imgBox.css';
class ImgBox extends React.PureComponent{
	constructor(props){
		super(props)
		this.state={
			showDimmer:false,
			imgOnload:false,
			width:'',
		}
		
		
	}
	handleShow=()=>this.setState((s)=>{
		return {showDimmer:true}})	

	handleHide=()=>this.setState({showDimmer:false})

	componentDidUpdate(){
		if(this.img){
			this.setState({width:this.img.clientWidth})
		}
	}
		
	
	urlSet(url,width,height){
		return url.replace(/&w=[\d]+&((fit=max)|(fit=crop))?/,`&w=${width}${height?'&h='+height:''}&fit=crop`)
	}
	
	render(){	
	    const {history,info}	=this.props
	     let pd=100*info.height/info.width.toFixed(2)
	     	
		return (
			<div onMouseEnter={this.handleShow} onMouseLeave={this.handleHide}  onClick={()=>{
						this.props.isCardInit()
						history.push('/search/image/'+info.id,{top:document.documentElement.scrollTop})
								}
					} style={{paddingTop:pd+'%'}} className='_imgflexWater'>
	 				
          			<div className={this.state.showDimmer?'_uspboxmmModal _imgBoxmodal _transM':'_uspboxmmModal _imgBoxmodal'}>
	 						        		<div><Icon  name='heart'/><span>{info.likes}</span></div>
	 						        			        		
	 						        	</div>
	 			   <img ref={(r)=>this.img=r} sizes={this.state.width+'px'} data-srcset={`${this.urlSet(info.urls.small,240)} 240w,${this.urlSet(info.urls.small,320)} 320w,${this.urlSet(info.urls.small,480)} 480w,${this.urlSet(info.urls.small,640)} 640w`}  alt={info.description} className='img-small img-default ' src={this.urlSet(info.urls.small,10)} data-src={this.urlSet(info.urls.small,this.state.width)} />
          			
				
			
       		</div>
		)
	}
	

}
export default ImgBox

			

