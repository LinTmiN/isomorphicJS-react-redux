import React from 'react'

import CollectExploreContainer from '../../containers/collectExploreContainer'
import MainSticky from '../mainSticky'
import {connect} from 'react-redux'


class CollectPage extends React.PureComponent{
	constructor(props){
	   super(props)
       this.state={
       	 
       }
	}
	 handleContextRef = contextRef => this.setState({ contextRef })
	render(){
		return (
			<React.Fragment>
			
			<main className='_cpmain'>
			<section ref={(this.handleContextRef)} className='_clpg'>
			  
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