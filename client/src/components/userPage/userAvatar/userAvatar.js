import React from 'react'
import ModalWrap from '../../modalWrap'
import {connect} from 'react-redux'
import WebAPI from '../../../utils/WebAPI'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import Popup from '../../popup'
class UserAvatar extends React.PureComponent{
	constructor(props){
		super(props)
		this.myref=React.createRef()
		this.state={showAvatarlist:false,popup:false}
	}
	componentDidUpdate(prevProps){
		console.log('update')
		if(this.props.editAvatarStatus.date!==prevProps.editAvatarStatus.date&&!this.props.isEditAvatar){
			this.setState({popup:true},()=>{
				setTimeout(()=>{this.setState({popup:false})},5000)
			})
		}
	}
	render(){
		let {isEditAvatar,editAvatarStatus,userInfo,editAvatar,className,...rest}=this.props
		
		return (
			<React.Fragment>
				<div {...rest} className={this.props.className?'_avatarlist '+className:'_avatarlist'}>
					<button title='更改头像'  disabled={isEditAvatar} onClick={(e)=>{e.stopPropagation();if(userInfo.avatar.path==='/uploads/user.jpg'){this.myref.current.click();return};this.setState((preS)=>({showAvatarlist:!preS.showAvatarlist}))}}  className='_uspageavatar'> 
						{isEditAvatar?<Loader className='_editavatarloader' active inline='centered' size='mini'/>:""}
						<img style={{opacity:isEditAvatar?'0.5':'1'}} src={userInfo.avatar.path}/>
						<section style={{display:'none'}}><form encType='multipart/form-data'><input name='avatar'  ref={this.myref} onChange={(e)=>{editAvatar(e.target.files[0]);this.myref.current.value='';this.setState({showAvatarlist:false})}} accept='image/jpeg' type='file'/></form></section>
					</button>
				</div>
				{this.state.showAvatarlist?(
				
					
						<div onClick={()=>this.setState({showAvatarlist:false})} className='mymodal _mymodal'>
						<div className='_avatarbuttonlist'>
							
							<div className='_avatarlistContain'>
								<div className="_avatarlistTitle">
									<h4>更换头像</h4>
								</div>
								<div className='_avatarbuttonGroup'>
									 <button onClick={(e)=>{e.stopPropagation();this.myref.current.click()}} className='_bluebutton'>上传头像</button>
									 <button  onClick={()=>{editAvatar('delete');}} className='_redbutton'>移除当前头像</button>
									 <button>取消</button>
								</div>
							</div>
						</div>
					</div>
					
					
				
				):""}
				<Popup open={this.state.popup} className='_popupres' message={editAvatarStatus.message} />
			</React.Fragment>
		)
	}
}

export default connect(
	(state)=>({
		isEditAvatar:state.getIn(['user','isEditAvatar']),
		editAvatarStatus:state.getIn(['user','editAvatarStatus']).toJS(),
		userInfo:state.getIn(['user','userInfo']).toJS()
	}),
	(dispatch)=>({
		editAvatar:(file)=>{
			WebAPI.editAvatar(dispatch,file)
		},

	})
)(UserAvatar)