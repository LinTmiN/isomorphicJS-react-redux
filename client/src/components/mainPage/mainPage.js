import React from 'react';
import MainBar from '../mainBar';
import { BrowserRouter as Router,Route,Switch,withRouter } from 'react-router-dom'
import ModalContainer from '../../containers/modalContainer'
import ExploreModal from '../exploreModal'
import CollectPage from '../collectPage'
import SearchPage from '../searchPage'
import ScrollToTop from '../scrollToTop'
import './sf.css'
import {TransitionGroup,Transition} from 'react-transition-group'
class NoMatch extends React.Component{
  render(){
      return <div style={{paddingTop:'135px'}}>很抱歉，页面不存在</div>
  }
}
const MainPage=({location})=>(

      <section>

      	
        <ScrollToTop>
       
       
        	<Route  path='/search/:type' component={SearchPage} />
          <Route exact path='/collect' component={CollectPage} />
          <Route  path='/explore' component={ExploreModal} />
         
     
     
        </ScrollToTop>
        <Route  path='/search/:type/:key' component={ModalContainer} />
  		      
      </section>

)
export default withRouter(MainPage)