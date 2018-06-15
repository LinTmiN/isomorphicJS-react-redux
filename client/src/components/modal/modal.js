import React from 'react';

import './modal.css';
import Card from '../../containers/cardContainer'
import ModalWrap from '../modalWrap'
class Modal extends React.Component{
	constructor(props){
		super(props)
	}
	

	render(){
		const {match ,history} =this.props;
		const type=match.params.type
		return (
			<ModalWrap top={this.props.location.state.top}>
				<div>
				{!this.props.isCardInit?<div className='_myprogress'></div>:''}
				
				<div onClick={()=>{
					
					if(this.props.isCardInit)
					history.push('/search/'+type,{keepTop:true})
					}
				} className={this.props.isCardInit?'mymodal':''}>
					
					<Card type={type} id={match.params.key}/>
				</div>
				</div>
			</ModalWrap>
		)
	}

}
export default Modal