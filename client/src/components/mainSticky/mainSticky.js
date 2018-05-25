import React from 'react';
import {Rail, Sticky,Header,Segment } from 'semantic-ui-react'
import {connect } from 'react-redux'
import './mainSticky.css'
class MainSticky extends React.Component{
	render(){
		const {userinfo}=this.props

		return (
			<div className='_msct' >
			 
                <Sticky bottomOffset={50} context={this.props.context} offset={50} pushing>
                <div className='_msct2'>
	                  <div className='_msif'>
	                  	 <div className='_msifim'> <img src='https://pixabay.com/get/eb35b90c2cfd033ed1584d05fb1d4e9fe671e1d51dac104497f7c07bafe9b3b0_640.jpg' /></div>
	                  	 <div className='_msifus'>
	                  	    <div className='_msifname'><span>{userinfo.username}</span></div>
	                  	    <div className='_msifemail'><span>{userinfo.email}</span></div>
	                  	  </div>
	                  </div>
                  
                  </div>
                </Sticky>
              
             </div>
		)
	}
}
const mstp=(state)=>({
	userinfo:state.getIn(['user','userInfo']).toJS()
})
export default connect(mstp)(MainSticky)