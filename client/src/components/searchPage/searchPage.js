import React from 'react'
import SuggestCard from '../suggestCard'
import { Route, } from 'react-router-dom'
import ImgExploreContainer from '../../containers/imgExploreContainer'
import VideoExploreContainer from '../../containers/videoExploreContainer'
import MainBottom from '../mainbottom'
import MainBar from '../mainBar';
class SearchPage extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<React.Fragment>
			   <MainBar/>
				<SuggestCard/>
				  	
					<Route   path='/search/image' component={ImgExploreContainer}/>
      				<Route   path='/search/video' component={VideoExploreContainer} />	
					
      			<MainBottom/>
			</React.Fragment>
		)
	}
}
export default SearchPage