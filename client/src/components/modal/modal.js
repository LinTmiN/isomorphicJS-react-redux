import React from 'react';
import ReactDOM from 'react-dom'
import './modal.css';
import {Progress } from 'semantic-ui-react'
import faker from 'faker/locale/en';
import Card from '../../containers/cardContainer'
const modalroot = document.getElementById('modal-root');
class Modal extends React.Component{
	constructor(props){
		super(props)
		this.el=document.createElement('div')
	}
	componentDidMount(){
		modalroot.appendChild(this.el)
		document.body.className='mybody'
 		if(this.props.location.state){
		document.body.style.bottom=this.props.location.state.top+'px'
		}
	}
	componentWillUnmount(){
		modalroot.removeChild(this.el)
		document.body.className=''
		if(this.props.location.state){
		window.scrollTo(0,this.props.location.state.top)
	}
	}

	render(){
		const {match ,history} =this.props;
		const type=match.params.type
		
		
		return ReactDOM.createPortal(
			<div>
			{!this.props.isCardInit?<Progress  color='blue' style={{position:'fixed',top:'0',width:'100%'}} size='tiny' percent={100} active>
   				 Active
 			 </Progress>:''}
			
			<div onClick={()=>{
				
				if(this.props.isCardInit)
				history.push('/'+type)
				}
			} className={this.props.isCardInit?'mymodal':''}>
				
				<Card type={type} mykey={match.params.key}/>
			</div>
			</div>,
			this.el
		)
	}

}
export default Modal