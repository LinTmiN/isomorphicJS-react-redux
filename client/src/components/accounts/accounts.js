import React from 'react'
import './accounts.css'
import {NavLink} from 'react-router-dom'
import MainBottom from '../mainbottom'
import UserAvatar from '../userPage/userAvatar'
import { Button } from 'semantic-ui-react'
import {connect} from 'react-redux'
import Popup from '../popup'
import WebAPI from '../../utils/WebAPI'
class Accounts extends React.Component{
	constructor(props){
		super(props)
		
		this.state={
			username:'',
			email:'',
			webSite:'',
			selfIro:'',
			phone:'',
			sexual:'未指定',
			disabled:true,
			showAvatarlist:false,
			highOrder:false,
			fetchUpdateUser:false,
			oldPassword:'',
			newPassword:"",
			confirmPassword:''

		}
	}
	componentDidMount(){
		let {userInfo}=this.props
		
		this.setState({
			 username:userInfo.username,
			  email:userInfo.email,
			  webSite:userInfo.webSite,
			  selfIro:userInfo.selfIro,
			  phone:userInfo.phone,
			  sex:userInfo.sex
		})
	}

	componentDidUpdate(prevProps){
		
		if(this.props.editAvatarStatus.toJS().date!==prevProps.editAvatarStatus.toJS().date&&!this.props.isEditAvatar){
			   clearTimeout(this.timeout)
			   let that=this
			if(this.state.popup){
				this.setState({popup:false},()=>{
					setTimeout(()=>that.setState({popup:true},()=>{
						that.timeout=setTimeout(()=>{this.setState({popup:false})},3000)
					}),300)
				})
		}else{
			   
				this.setState({popup:true},()=>{
				that.timeout=setTimeout(()=>{this.setState({popup:false})},3000)
			})
			
		}
	}
}
	render(){
		let {match:{params:{type}},isEditAvatar,editAvatarStatus,confirm}=this.props,
			{username,email,webSite,selfIro,phone,sex,disabled,highOrder,fetchUpdateUser,oldPassword,newPassword,confirmPassword}=this.state;
			editAvatarStatus=editAvatarStatus.toJS()
			
		return (
			<React.Fragment>
			<main className='_clpg _userpagemain'>
				<div className='_accountsmain'>
				 <ul className='_tabAc'>
				 	<li><NavLink className={type==='edit'?'_tabAL _tabALactive':'_tabAL'} to='/accounts/edit'>编辑主页</NavLink></li>
				 	<li><NavLink  className={type==='password'?'_tabAL _tabALactive':'_tabAL'} to='/accounts/password'>更改密码</NavLink></li>
				 </ul>
				 <article className='_editform'>
				 	 {type==='edit'?<React.Fragment><header className='_EDheader'>
				 	 				 	 	<UserAvatar isEditAvatar={isEditAvatar} forWardref={(r)=>this.Ava=r} showAvatarlist={this.state.showAvatarlist} className='_editacountava _EDavasize'/>
				 	 				 	 	<div className='_acEditAva'>
				 	 				 	 		<h1>{this.state.username}</h1>
				 	 				 	 		<span onClick={()=>this.Ava.click()}>编辑头像</span>
				 	 				 	 	</div>
				 	 				 	 </header>
				 	 				 	 <form onChange={()=>{if(!this.state.disabled)return;this.setState({disabled:false})}} className='_EDform'>
				 	 				 	 	<div   className='_EDformBox _EDformBoxRes'>
				 	 				 	 		<aside className='_EDformAside'><label htmlFor='username'>用户名</label></aside>
				 	 				 	 		 <div className='_EDformInput'><input onChange={(e)=>{this.setState({[e.target.id]:e.target.value,highOrder:!e.target.value})}} type='text'  value={username} id='username'/></div>
				 	 				 	 		
				 	 				 	 	</div>
				 	 				 	 	<div  className='_EDformBox _EDformBoxRes'>
				 	 				 	 		<aside className='_EDformAside'><label htmlFor='webSite'>网站</label></aside>
				 	 				 	 		 <div className='_EDformInput'><input id='webSite'  onChange={(e)=>this.setState({[e.target.id]:e.target.value})} value={webSite}/></div>
				 	 				 	 	</div>
				 	 				 	 	
				 	 				 	 	<div  className='_EDformBox _EDformBoxRes'>
				 	 				 	 		<aside className='_EDformAside'><label htmlFor='selfIro'>个人简介</label></aside>
				 	 				 	 		 <div className='_EDformInput'><textarea onChange={(e)=>this.setState({[e.target.id]:e.target.value})} value={selfIro} id='selfIro'/></div>
				 	 				 	 	</div>
				 	 				 	 	
				 	 				 	 	<div  className='_EDformBox _EDformBoxRes'>
				 	 				 	 		<aside className='_EDformAside'><label > </label></aside>
				 	 				 	 		 <div className='_EDformInput'><span>私人信息</span></div>
				 	 				 	 	</div>
				 	 
				 	 				 	 	<div  className='_EDformBox _EDformBoxRes'>
				 	 				 	 		<aside className='_EDformAside'><label htmlFor='email'>邮箱</label></aside>
				 	 				 	 		 <div className='_EDformInput'><input onChange={(e)=>this.setState({[e.target.id]:e.target.value,highOrder:!e.target.value})} type='text' value={email} id='email'/></div>
				 	 				 	 	</div>
				 	 				 	 	
				 	 				 	 	<div  className='_EDformBox _EDformBoxRes'>
				 	 				 	 		<aside className='_EDformAside'><label htmlFor='phone'>电话号码</label></aside>
				 	 				 	 		 <div className='_EDformInput'><input onChange={(e)=>this.setState({[e.target.id]:e.target.value})} type='text' value={phone} id='phone'/></div>
				 	 				 	 	</div>
				 	 				 	 	<div  className='_EDformBox _EDformBoxRes'>
				 	 				 	 		<aside className='_EDformAside '><label htmlFor='sex'>性别</label></aside>
				 	 				 	 		 <div className='_EDformInput _EdformSelect'><select onChange={(e)=>this.setState({[e.target.id]:e.target.value})} value={sex} id='sex'>
				 	 				 	 		 <option value='男'>男</option>
				 	 				 	 		  <option value='女'>女</option>
				 	 				 	 		   <option value='未指定'>未指定</option>
				 	 				 	 		 </select></div>
				 	 				 	 	</div>
				 	 				 	 	<div  className='_EDformBox _EDformBoxRes'>
				 	 				 	 		<aside className='_EDformAside'><label ></label></aside>
				 	 				 	 		 <div className='_EDformInput _EdformSelect'><Button type="button" size='mini' disabled={disabled||highOrder} 
				 	 				 	 		 	onClick={()=>{
				 	 				 	 		 		this.setState({fetchUpdateUser:true})
				 	 				 	 		 		let {username,email,webSite,selfIro,phone,sex}=this.state;
				 	 				 	 		 		 confirm({username,email,webSite,selfIro,phone,sex}).then((data)=>{
				 	 				 	 		 		 	this.setState({fetchUpdateUser:false,disabled:data})
				 	 				 	 		 		 })
				 	 				 	 		 	}} primary loading={fetchUpdateUser}>
				 	 				 	 		 		提交
				 	 				 	 		 	</Button>
				 	 				 	 		 	</div>
				 	 				 	 	</div>
				 	 				 	 </form></React.Fragment>
				 	 				 	 : <form onChange={()=>{if(confirmPassword&&newPassword&&oldPassword){this.setState({disabled:false})}else{this.setState({disabled:true})}}} className='_EDform'>
				 	 				 	 	<div   className='_EDformBox _EDformBoxRes'>
				 	 				 	 		<aside className='_EDformAside'><label htmlFor='oldPassword'>旧密码</label></aside>
				 	 				 	 		 <div className='_EDformInput'><input  type='password' onChange={(e)=>{this.setState({[e.target.id]:e.target.value,highOrder:!e.target.value})}}   value={oldPassword} id='oldPassword'/></div>
				 	 				 	 		
				 	 				 	 	</div>
				 	 				 	 	<div  className='_EDformBox _EDformBoxRes'>
				 	 				 	 		<aside className='_EDformAside'><label htmlFor='newPassword'>新密码</label></aside>
				 	 				 	 		 <div className='_EDformInput'><input id='newPassword'  type='password' onChange={(e)=>{this.setState({[e.target.id]:e.target.value,highOrder:!e.target.value})}}  value={newPassword}/></div>
				 	 				 	 	</div>
				 	 				 	 <div  className='_EDformBox _EDformBoxRes'>
				 	 				 	 		<aside className='_EDformAside'><label htmlFor='confirmPassword'>确认密码</label></aside>
				 	 				 	 		 <div className='_EDformInput'><input id='confirmPassword' type='password'  onChange={(e)=>{this.setState({[e.target.id]:e.target.value,highOrder:!e.target.value})}}  value={confirmPassword}/></div>
				 	 				 	 	</div>
				 	 				 	 
				 	 				 	 	<div  className='_EDformBox _EDformBoxRes'>
				 	 				 	 		<aside className='_EDformAside'><label ></label></aside>
				 	 				 	 		 <div className='_EDformInput _EdformSelect'><Button type="button" size='mini' disabled={disabled||highOrder} 
				 	 				 	 		 	onClick={()=>{
				 	 				 	 		 		this.setState({fetchUpdateUser:true})
				 	 				 	 		 		let {oldPassword,newPassword,confirmPassword}=this.state;
				 	 				 	 		 		 confirm({oldPassword,newPassword,confirmPassword}).then((data)=>{
				 	 				 	 		 		 	this.setState({fetchUpdateUser:false,disabled:data,
				 	 				 	 		 		 			oldPassword:'',newPassword:'',confirmPassword:''
				 	 				 	 		 		 	})
				 	 				 	 		 		 })
				 	 				 	 		 	}} primary loading={fetchUpdateUser}>
				 	 				 	 		 		提交
				 	 				 	 		 	</Button>
				 	 				 	 		 	</div>
				 	 				 	 	</div>
				 	 				 	 </form>
				 	 				 	}
				 	 <Popup open={this.state.popup} className='_popupres' message={editAvatarStatus.message} />
				 </article>
				</div>
				
			</main>
			<MainBottom/>
			</React.Fragment>
		)
	}
}


export default connect(
	(state)=>({
		userInfo:state.getIn(['user','userInfo']).toJS(),
		isEditAvatar:state.getIn(['user','isEditAvatar']),
		editAvatarStatus:state.getIn(['user','editAvatarStatus']),
		}),
	(dispatch)=>({
		confirm:(info)=>WebAPI.editProfile(dispatch,info)
	})

)(Accounts)