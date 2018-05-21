import React from 'react';
import MainBar from '../mainBar';
import SuggestCard from '../suggestCard'
import { BrowserRouter as Router,Route,Switch ,Redirect} from 'react-router-dom'
import ImgExplore from '../../containers/imgExploreContainer'
import VideoExplore from '../../containers/videoExploreContainer'
import ModalContainer from '../../containers/modalContainer'
import MainBottom from '../mainbottom'
import './sf.css'
const MainPage=()=>(
	<Router>
      <div>

      	<MainBar/>
        
      	<SuggestCard/>

      	<Switch>
      	<Route exact path='/' render={()=><Redirect to='/video' />} />
      	<Route  path='/image' component={ImgExplore}/>
      	<Route path='/video' component={VideoExplore} />		
        </Switch>
        <Route path='/:type/:key' component={ModalContainer} />
        <MainBottom/>
      </div>
</Router>
)
export default MainPage