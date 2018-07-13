import React from 'react';
import ReactDOM from 'react-dom'
const modalroot = document.getElementById('modal-root');
class ModalWrap extends React.Component{
	constructor(props){
		super(props)
		this.el=document.createElement('div')
	}
	componentDidMount(){
		document.body.className='_mybody'
		modalroot.appendChild(this.el)
		document.body.style.top=-this.props.top+'px'
		
	}
	componentWillUnmount(){
		document.body.className=''
		modalroot.removeChild(this.el)
		document.body.style.top=''
		if(this.props.top){window.scrollTo(0,this.props.top)}
		
	}
	render(){
		return ReactDOM.createPortal(this.props.children,this.el)
	}
}
export default ModalWrap