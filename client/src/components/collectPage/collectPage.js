import React from 'react'
import './collectPage.css'
import CollectExploreContainer from '../../containers/collectExploreContainer'
import MainSticky from '../mainSticky'
class CollectPage extends React.Component{
	constructor(props){
	   super(props)
       this.state={
       	 
       }
	}
	 handleContextRef = contextRef => this.setState({ contextRef })
	render(){
		return (
			<main className='_cpmain'>
			<section ref={this.handleContextRef} className='_clpg'>
			  
				<CollectExploreContainer/>
				<MainSticky context={this.state.contextRef}/>
			</section>
			</main>
		)
	}
}
export default CollectPage