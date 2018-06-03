import React from 'react';
import {Sticky} from 'semantic-ui-react'
import {connect } from 'react-redux'
import './mainSticky.css'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import O from './o'

class MainSticky extends React.PureComponent{
	render(){
		const {userinfo,collect}=this.props

		return (
			<div className='_msct' >
			 
                <Sticky bottomOffset={50} context={this.props.context} offset={50} pushing>
                <div className='_msct2'>
	                  <div className='_msif'>
	                  	 <div className='_msifim'> <img alt={`${userinfo.username}'s avatar`} src={userinfo.avatar} /></div>
	                  	 <div className='_msifus'>
	                  	    <div className='_msifname'><span>{userinfo.username}</span></div>
	                  	    <div className='_msifemail'><span>{userinfo.email}</span></div>
	                  	  </div>
	                  </div>
	                  <div className='_msfvc'>
	                  	  <div className='_msfvti'><h2>快拍<span>全部播放</span></h2></div>
		                  <div className='_msfv'>
	                  		  	{collect.length===0?<span style={{fontSize:'12px',color:"#999"}}>快速浏览你的收藏视频</span>:collect.map((item,index)=><O key={index} id={item.id}/>)}
						  </div>
					  </div>
					  <nav className='_msnav'>
					  	 <ul>
						  	 <li>
						  	 	关于我们
						  	 </li>
						  	 <li>
						  	 	api
						  	 </li>
						  	 <li>
						  	 	博客
						  	 </li>
						  	 <li>
						  	 	主页
						  	 </li>
						  	 <li>
						  	 	目录
						  	 </li>
						  	 <li>
						  	 	新闻中心
						  	 </li>
						  	 <li>
						  	 	隐私
						  	 </li>
						  	 <li>
						  	 	话题标签
						  	 </li>
						  	 <li>
						  	 	语言
						  	 </li>
					  	 </ul>
					  </nav>
					  <span style={{fontSize:'11px',color:'#c7c7c7',textAlign:'left',display:"block",width:"100%"}}>@2018 REXtube</span>
                  </div>
                </Sticky>
              
             </div>
		)
	}
}
const mstp=(state)=>({
	userinfo:state.getIn(['user','userInfo']).toJS(),
	collect:state.getIn(['user','collect']).toJS().filter((i)=>i.type==='video')
})
export default connect(mstp)(MainSticky)