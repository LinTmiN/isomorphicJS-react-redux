import React from 'react';


import Card from '../../containers/cardContainer'
import ModalWrap from '../modalWrap'
import {Redirect } from 'react-router-dom'

class Modal extends React.PureComponent{
	constructor(props){
		super(props)
		this.props.CardInit()
		this.state={redirect:false}
	}
	
	static getDerivedStateFromProps(props){
		console.log(props)
		if(!(props.location.state&&props.location.state.top)){
			return {redirect:true}
		}else{return null}
	}
	render(){
		const {match ,history,location} =this.props;
		const type=match.params.type
		 
		return (
			<React.Fragment>
			{this.state.redirect?<Redirect to={`/detail/${type}/${match.params.key}`}/>:(<ModalWrap top={location.state&&location.state.top}>
										<div>
												{!this.props.isCardInit?<div className='_myprogress'></div>:""}		
														
														<div onClick={()=>{
															let path=/^\/user\//.test(location.pathname)?'/user':'/search/'+type
															if(this.props.isCardInit)
															history.push(path,{keepTop:true})
															}
														} className={this.props.isCardInit?'mymodal':''}>
															
															<Card type={type} id={match.params.key}/>
														</div>
														</div>
									</ModalWrap>)}
			</React.Fragment>
		)
	}

}
export default Modal

//:<Redirect to={`/detail/${type}/${match.params.key}`}/>