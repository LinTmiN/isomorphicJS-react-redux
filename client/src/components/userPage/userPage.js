import React from 'react'
import UserAvatar from './userAvatar'
import './userPage.css'
import {NavLink} from 'react-router-dom'
import {Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import MainBottom from '../mainbottom'
import ModalWrap from '../modalWrap'
import UserList from './userList'
import WebAPI from '../../utils/WebAPI'
import Popup from '../popup'
const EditButton=()=>(
	<NavLink className='_buttonlink' to='/accounts/edit'>
		<span><button type='button'>编辑个人主页</button></span>
	</NavLink>
)
const Userinfo =({collect,trends,likes})=>(
	<ul className='_userul'>
		<li><span>{collect}</span>收藏</li>
		<li><span>{likes}</span>赞</li>
		<li>动态<span>{trends}</span></li>
	</ul>
)
const Selfpage = ({username,selfIntro,web})=>(
	<div className='_selfpage'>
		<h1>{username}</h1>
		<p>{selfIntro}</p>
		<a href={'http://'+web}>{web}</a>
	</div>
)
class UserPage extends React.PureComponent{ 
	constructor(props){
		super(props)
		this.state={signout:false,finish:false,popup:false,load:true}
		let {likes,collect}=this.props.userInfo.toJS(),
		    {getSth} = this.props;
		   
			Promise.all([getSth('likeslist',likes),getSth('collect',collect)]).then((data)=>{this.setState({load:false})})
		
	
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
		let	{editAvatarStatus,isEditAvatar}=this.props,
			{username,likes,trends,collect,selfIro,webSite}=this.props.userInfo.toJS(),
			width=this.props.screen.toJS().width;		
		editAvatarStatus=editAvatarStatus.toJS()
			
		return (
			<React.Fragment>
						
				<main className="_userpagemain">
				<section className='_clpg'>

				  <section id='_uspage' className='_uspage'>
						<header className='_uspageheader'>
							<div  className='_avatarlist'>
							<UserAvatar isEditAvatar={isEditAvatar} />
							</div>
							<section className='_infosection'>
							    <div className='_uspnam'>
									<h1>{username}</h1>
									{width>725?<EditButton/>:''}
									<button onClick={()=>this.setState({signout:true})} className='_setbutn' >
										<Icon  className='_iconbutn' size='big' name="sun outline" />
										
										{this.state.signout?
										<ModalWrap top={window.scrollY||document.documentElement.scrollTop}>
											<div onClick={(e)=>{e.stopPropagation();this.setState({signout:false})}}  className='mymodal _mymodal'>
												<div className='_avatarbuttonlist'>

													<div className='_avatarlistContain'>
														<div className="_avatarlistTitle">
															<h4>设置</h4>
														</div>
														<div className='_avatarbuttonGroup'>
															<button  >更改密码</button>
															<button onClick={()=>this.props.logout()}>退出</button>
															<button onClick={(e)=>{e.stopPropagation();this.setState({signout:false})}}>取消</button>
														</div>
													</div>
												</div>
											</div>
										</ModalWrap>
										:''
										}
									
									</button>
								</div>
								{width<725?
								<div>
									<EditButton/>
								</div>
								:""}
								{width>725?
								<React.Fragment>
								<Userinfo collect={collect.length} trends={trends.length} likes={likes.length}/>
								<Selfpage username={username} web={webSite} selfIntro={selfIro}/>
								</React.Fragment>
								:''}	
							</section>
						</header>
						{width<=725?
						<React.Fragment>
							<Selfpage username={username} web={'www.ba.c'} selfIntro={'lll'}/>
							<Userinfo collect={collect.length} trends={trends.length} likes={likes.length}/>
						</React.Fragment>
						:''}
						<UserList load={this.state.load}/>
						<Popup open={this.state.popup} className='_popupres' message={editAvatarStatus.message} />
					</section>	
				</section>
				</main>
				<MainBottom/>
			</React.Fragment>
			
			
		)
	}
}
export default connect(
	(state)=>({
		screen:state.getIn(['input','screen']),
		userInfo:state.getIn(['user','userInfo']),
		isEditAvatar:state.getIn(['user','isEditAvatar']),
		editAvatarStatus:state.getIn(['user','editAvatarStatus']),
	}),
	 (dispatch)=>({
	 	logout:()=>{WebAPI.logout(dispatch)},
	 	getSth:(type,typearr)=>{
			return WebAPI.fetchmy(dispatch,type,typearr)
		}
	 	
	 })
)(UserPage)