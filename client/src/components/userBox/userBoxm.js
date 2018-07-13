import React from 'react'
import {NavLink} from 'react-router-dom'
import {Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {handleNum} from '../../constants/fun'
class UserBoxty extends React.PureComponent{
	constructor(props){
		super(props)
		this.state={
			modal:false,
			width:''
		}
		this.myref=React.createRef()
		
		
	}
	urlSet(url,width,height){
		return url.replace(/&w=[\d]+&((fit=max)|(fit=crop))?/,`&w=${width}${height?'&h='+height:''}&fit=crop`)
	}
	componentDidUpdate(){
		if(this.img){
			this.setState({width:this.img.clientWidth})
		}
	}
	srcset(src){
		let {data}=this.props
		if(data.type==='image'){
			return `${this.urlSet(src,240)} 240w,${this.urlSet(src,320)} 320w,${this.urlSet(src,480)} 480w,${this.urlSet(src,640)} 640w`
		}else{
			let key=Object.keys(data.thumbnail),
				srcset;
			for(let a in key){
				srcset += `${data.thumbnail[key[a]].url} ${data.thumbnail[key[a]].width}w,`
			}
			return srcset
		}
	}
	render(){
		let {data,to}=this.props,
			src=data.type==='video'?data.thumbnail.default.url:data.thumbnail.small,
			srcset=this.srcset(src)
		return (
			<div  onMouseLeave={()=>this.setState({modal:false})} onMouseEnter={()=>this.setState({modal:true})} className='_uspboxm _usb'>
			      <NavLink className='_usblink' to={{pathname:to?`${to}${data.type}/${data.id}`:`/user/${data.type}/${data.id}`,state:to?{}:{top:window.scrollY||document.documentElement.scrollTop},}}>
			      <div className='_uspboxmm'>
			            {data.type==='video'?<div className='_boxicon'><Icon name='video'/></div>:""}
		        <div className={this.state.modal?'_uspboxmmModal _imgBoxmodal _transM':'_uspboxmmModal _imgBoxmodal'}>
		        			        		<div><Icon  name='heart'/><span>{handleNum(data.likes)}</span></div>
		        			        		{data.type==='video'?<div><Icon name='comment'/><span>{handleNum(data.comment)}</span></div>:""}
		        </div>
		        	
			 		<img alt={`img ${data.id}`} className='img-small img-default' ref={(r)=>this.img=r} sizes={this.state.width+'px'} data-srcset={srcset} data-src={this.urlSet(src,this.state.width)} src={this.urlSet(src,10)}/>
					</div>
			        
					</NavLink>
			</div>
		)
	}
}


export default connect(
	(state)=>({
		handleNum:state.getIn(['fun','handleNum'])
	}),
	
)(UserBoxty)