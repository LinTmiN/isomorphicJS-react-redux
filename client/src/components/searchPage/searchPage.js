import React from 'react'
import SuggestCard from '../suggestCard'
import { Route, } from 'react-router-dom'
import ImgExploreContainer from '../../containers/imgExploreContainer'
import VideoExploreContainer from '../../containers/videoExploreContainer'
import MainBottom from '../mainbottom'

import './searchPage.css'
class SearchPage extends React.Component{

	render(){
		return (
			<React.Fragment>
			   <section className='_serPage'>
				<SuggestCard/>
				  	
					<Route   path='/search/image' component={ImgExploreContainer}/>
      				<Route   path='/search/video' component={VideoExploreContainer} />	
					
      			<MainBottom/>
      			</section>
			</React.Fragment>
		)
	}
}
export default SearchPage