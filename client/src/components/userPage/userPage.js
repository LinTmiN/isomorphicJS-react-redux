import React from 'react'
import MainBar from '../mainBar';
import UserAvatar from './userAvatar'
import './userPage.css'
class UserPage extends React.Component{
	constructor(props){
		super(props)
		this.myref=React.createRef()
		this.state={url:'../../media/user.jpg'}
	}
	render(){
		return (
			<React.Fragment>
				<MainBar/>
				<section className='_clpg'>
					<header>
						<UserAvatar className='_jsklagjl'/>
						<section></section>
					</header>
				</section>
			</React.Fragment>
		)
	}
}
export default UserPage