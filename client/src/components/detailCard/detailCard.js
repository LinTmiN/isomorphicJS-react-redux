import React from 'react'

import Card from '../../containers/cardContainer'
import './detailCard.css'
import MainBottom from '../mainbottom'

import { isCardInit } from '../../actions'
import {connect } from 'react-redux'
class DetailCard extends React.Component{

    componentDidMount(){
    	this.props.CardInit()
    }
    componentDidUpdate(nprops){
    	if(nprops.match.params.id!==this.props.match.params.id){
    		this.props.CardInit()
    	}
    }
	render(){
		let {match} =this.props;
		let type=match.params.type

		return (
			<React.Fragment>

			<main className="_userpagemain">
				{this.props.isCardInit?"":<div className='_myprogress'></div>}
				<section className='_clpg'>
				<div style={{background:'none',position:'relative'}} className='mymodal'>
				<Card type={type} id={match.params.id}/>
			</div>
			 </section>
			
			 </main>
			  <MainBottom/>
			</React.Fragment>

		)
	}
}

export default connect(
	(state)=>({
		isCardInit:state.getIn(['search','isCardInit'])
	}),
	(dispatch)=>({
		CardInit:()=>{
			dispatch(isCardInit(false))
		}
	})
	)(DetailCard)
 // <Card type={type} id={match.params.id}/>