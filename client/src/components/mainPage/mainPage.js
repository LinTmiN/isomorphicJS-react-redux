import React from 'react';
import MainBar from '../mainBar';
import SuggestCard from '../suggestCard'
import { BrowserRouter as Router,Route,Switch ,Redirect} from 'react-router-dom'
import ModalContainer from '../../containers/modalContainer'
import MainBottom from '../mainbottom'
import CollectPage from '../collectPage'
import SearchPage from '../searchPage'
import './sf.css'
const MainPage=()=>(
	<Router>
      <section>

      	<MainBar/>
        <Switch>	
      	<Route  path='/search' component={SearchPage} />
        <Route path='/collect' component={CollectPage} />
        </Switch>
        <Route  path='/search/:type/:key' component={ModalContainer} />
        <MainBottom/>
      </section>
</Router>
)
export default MainPage