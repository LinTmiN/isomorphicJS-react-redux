import React from 'react';
import MainBar from '../mainBar';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import ModalContainer from '../../containers/modalContainer'
import ExploreModal from '../exploreModal'
import CollectPage from '../collectPage'
import SearchPage from '../searchPage'
import ScrollToTop from '../scrollToTop'
import './sf.css'
class NoMatch extends React.Component{
  render(){
      return <div style={{paddingTop:'135px'}}>很抱歉，页面不存在</div>
  }
}
const MainPage=()=>(
	<Router>
      <section>

      	
        <ScrollToTop>
        <Switch>	

      	<Route  path='/search/:type' component={SearchPage} />
        <Route exact path='/collect' component={CollectPage} />
        <Route exact path='/explore/:id' component={ExploreModal} />
        <Route component={NoMatch} />
        </Switch>
        </ScrollToTop>
        <Route  path='/search/:type/:key' component={ModalContainer} />
  		      
      </section>
</Router>
)
export default MainPage