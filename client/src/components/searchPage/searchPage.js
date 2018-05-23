import React from 'react'
import SuggestCard from '../suggestCard'
import {BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import ImgExploreContainer from '../../containers/imgExploreContainer'
import VideoExploreContainer from '../../containers/videoExploreContainer'
import ModalContainer from '../../containers/modalContainer'
class SearchPage extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<React.Fragment>
			  
				<SuggestCard/>
				  
					<Route   path='/search/image' component={ImgExploreContainer}/>
      				<Route   path='/search/video' component={VideoExploreContainer} />	
					

			</React.Fragment>
		)
	}
}
export default SearchPage