import React from 'react';
import {Icon} from 'semantic-ui-react';
import './videoBox.css'
import axios from 'axios'
import {handleNum,handleTime} from '../../constants/fun'
class VideoBox extends React.PureComponent{
	constructor(props){
		super(props)
			this.state={
				showInfo:false,
				
				statistics:{},
				
				width:'',
			}
			
			this.myref=React.createRef()
	}
	handleShow=()=>this.setState((preS)=>({showInfo:!this.state.showInfo}))
	componentDidUpdate(){
		if(this.img){
			this.setState({width:this.img.clientWidth})
		}
	}
	componentDidMount(){
		const {id:{videoId}}=this.props.info
		  
		axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id='+videoId+'&fields=items%2Fstatistics&key=AIzaSyC3RuAjIyRt6vsLE3KMJzVMx9LSWDxgb0A').then(({data})=>{
				if(this.unmount==='unmount'){return}
				
				this.setState({
					statistics:data.items[0].statistics,
					
				})
		})
	}
	componentWillUnmount(){
		this.unmount='unmount'
		
	}
	render(){	
	   const {history,info}	=this.props;
	     	let srcset='',
	     	    src=info.snippet.thumbnails.default||info.snippet.thumbnails.medium||info.snippet.thumbnails.high
					for(let b of Object.keys(info.snippet.thumbnails)){
						
						 srcset +=`${info.snippet.thumbnails[b].url} ${info.snippet.thumbnails[b].width}w,`
					}
		return (
 			<div onClick={()=>{
 					this.props.isCardInit()
 					history.push('/search/video/'+info.id.videoId,{top:document.documentElement.scrollTop})
 					}
 			} onMouseEnter={this.handleShow} onMouseLeave={this.handleShow} className='videoItem'>
 				 
 				 	<div className='_vdimct'>
 				 	 <div className='_vdimBox'>
	 				 	<img className='img-small img-default' ref={(r)=>this.img=r} sizes={this.state.width+'px'}  alt='somthing' data-srcset={srcset} data-src={src.url} src={src.url}/>
	 					<div className={this.state.showInfo===true?'videomodal _imgBoxmodal _transM':'videomodal  _imgBoxmodal'}>
		 					<Icon style={{margin:'0 auto'}} name='play' size='huge'/>
		 				    <div className='videoinfo'>
			 					<span >{handleTime(info.snippet.publishedAt)}</span>
			 					<span><Icon name='heart'/>{handleNum(this.state.statistics.likeCount)}</span>
			 					<span><Icon name='comment'/>{handleNum(this.state.statistics.commentCount)}</span>
		 					</div>
	 					</div>
	 				 </div>
 				</div>
 				<div className='_videgroupH'>
 				  <h1 className='videotitle' title={info.snippet.title}>{info.snippet.title}</h1>
 					<h2  className='videosubtitle'>{info.snippet.channelTitle+' | '+handleNum(this.state.statistics.viewCount)}</h2>
 				</div>
 			
 				
 			</div>

 
		)
	}
	

}
export default VideoBox

			

