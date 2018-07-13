import React from 'react';
import LoginPage from '../loginPage';
import MainPage from '../mainPage'
import {BrowserRouter as Router} from 'react-router-dom'
class SwitchC extends React.Component {

	componentWillMount(){
		let {checkAuthor} =this.props
		checkAuthor()
	}
	componentDidMount(){
		var timeout;
		this.debounced=function(){

			if(timeout)clearTimeout(timeout);
			timeout=setTimeout(()=>{this.props.getScreen()},500)
		}.bind(this)
		window.addEventListener('resize',this.debounced)
		
	}

	componentWillUnmount(){
		window.removeEventListener('resize',this.debounced)
	}
	
	render(){
		return (<Router>{this.props.isCheck?'':(<React.Fragment>{this.props.isAuthorized ?(<MainPage/>):(<LoginPage/>)}</React.Fragment>)}</Router>)
	}
}
	

export default SwitchC