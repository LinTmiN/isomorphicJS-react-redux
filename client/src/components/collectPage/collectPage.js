import React from 'react'
import './collectPage.css'
import CollectExploreContainer from '../../containers/collectExploreContainer'
import MainSticky from '../mainSticky'
import {connect} from 'react-redux'
import MainBar from '../mainBar';
class CollectPage extends React.Component{
	constructor(props){
	   super(props)
       this.state={
       	 
       }
	}
	 handleContextRef = contextRef => this.setState({ contextRef })
	render(){
		return (
			<React.Fragment>
			<MainBar/>
			<main className='_cpmain'>
			<section ref={this.handleContextRef} className='_clpg'>
			  
				<CollectExploreContainer/>
				{this.props.screen.width<=810?'':<MainSticky context={this.state.contextRef}/>}
			</section>
			</main>
			</React.Fragment>
		)
	}
}
export default connect((state)=>({
	screen:state.getIn(['input','screen'])
}))(CollectPage)