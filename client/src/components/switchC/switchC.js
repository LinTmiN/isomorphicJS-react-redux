import React from 'react';
import LoginPage from '../loginPage';
import MainPage from '../mainPage'

class SwitchC extends React.Component {
	constructor(props){
		super(props)
	}
	componentWillMount(){
		let {checkAuthor} =this.props
		checkAuthor()
	}
	componentDidMount(){
		window.addEventListener('resize',this.props.getScreen)
	}
	componentWillUnmount(){
		window.removeEventListener('resize',this.props.getScreen)
	}
	render(){
		return (<React.Fragment>{this.props.isCheck?'':(<React.Fragment>{this.props.isAuthorized ?(<MainPage/>):(<LoginPage/>)}</React.Fragment>)}</React.Fragment>)
	}
}
	

export default SwitchC