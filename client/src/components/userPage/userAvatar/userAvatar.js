import React from 'react'
import ModalWrap from '../../modalWrap'
import {connect} from 'react-redux'
import WebAPI from '../../../utils/WebAPI'
import {  Loader } from 'semantic-ui-react'

class UserAvatar extends React.PureComponent{
	constructor(props){
		super(props)
		this.myref=React.createRef()
		this.state={showAvatarlist:false}
	}



	render(){
		let {isEditAvatar,forWardref,editAvatarStatus,showAvatarlist,userInfo,editAvatar,className,...rest}=this.props
		userInfo=userInfo.toJS()
		return (
			<React.Fragment>
				
				    <div {...rest} className={this.props.className?'_jsklagjl '+className:'_jsklagjl'}>
					<button ref={forWardref} title='更改头像'  disabled={isEditAvatar} onClick={(e)=>{e.stopPropagation();if(userInfo.avatar.path==='/uploads/user.jpg'){this.myref.current.click();return};this.setState((preS)=>({showAvatarlist:!preS.showAvatarlist}))}}  className='_uspageavatar'> 
						{isEditAvatar?<Loader className='_editavatarloader' active inline='centered' size='mini'/>:""}
						<img alt={'更换头像'} style={{opacity:isEditAvatar?'0.5':'1'}} src={userInfo.avatar.path}/>
						<section style={{display:'none'}}><form encType='multipart/form-data'><input name='avatar'  ref={this.myref} onChange={(e)=>{editAvatar(e.target.files[0]);this.myref.current.value='';this.setState({showAvatarlist:false})}} accept='image/jpeg' type='file'/></form></section>
					</button>
					</div>
				
				{this.state.showAvatarlist?(
				
					<ModalWrap top={window.scrollY||document.documentElement.scrollTop}>
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
					
					</ModalWrap>
				
				):""}
				

			</React.Fragment>
		)
	}
}

export default connect(
	(state)=>({
		userInfo:state.getIn(['user','userInfo'])
	}),
	(dispatch)=>({
		editAvatar:(file)=>{
			WebAPI.editAvatar(dispatch,file)
		},

	})
)(UserAvatar)