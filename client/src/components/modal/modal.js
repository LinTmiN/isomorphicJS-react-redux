import React from 'react';
import ReactDOM from 'react-dom'
import './modal.css';
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
			{!this.props.isCardInit?<div className='_myprogress'></div>:''}
			
			<div onClick={()=>{
				
				if(this.props.isCardInit)
				history.push('/search/'+type,{keepTop:true})
				}
			} className={this.props.isCardInit?'mymodal':''}>
				
				<Card type={type} id={match.params.key}/>
			</div>
			</div>,
			this.el
		)
	}

}
export default Modal