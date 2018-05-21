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
	render(){
		return (<div>{this.props.isCheck?'':(<div>{this.props.isAuthorized ?(<MainPage/>):(<LoginPage/>)}</div>)}</div>)
	}
}
	

export default SwitchC