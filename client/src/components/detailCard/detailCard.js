import React from 'react'
import MainBar from '../mainBar';
import Card from '../../containers/cardContainer'
import './detailCard.css'
import MainBottom from '../mainbottom'
class DetailCard extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		let {match,history} =this.props;
		let type=match.params.type

		return (
			<React.Fragment>
			 <MainBar />
			 <section className='_detailCard'>
			 <Card type={type} id={match.params.id}/>
			 </section>
			 <MainBottom/>
			</React.Fragment>

		)
	}
}

export default DetailCard