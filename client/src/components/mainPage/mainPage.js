import React from 'react';
import MainBar from '../mainBar';
import { BrowserRouter as Router,Route,Switch,withRouter,Redirect } from 'react-router-dom'
import ModalContainer from '../../containers/modalContainer'
import ExploreModal from '../exploreModal'
import CollectPage from '../collectPage'
import SearchPage from '../searchPage'
import ScrollToTop from '../scrollToTop'
import './sf.css'
import {connect} from 'react-redux'
import {showTrends} from '../../actions'
import DetailCard from '../detailCard'
import UserPage from '../userPage'
class NoMatch extends React.Component{
  render(){
      return <div style={{paddingTop:'135px'}}>很抱歉，页面不存在</div>
  }
}
const MainPage=({location,showTrends})=>(

      <section onClick={showTrends}>

      	
        <ScrollToTop> 
          <Switch> 
          <Route exact path='/' render={()=>{return <Redirect to='/collect' />}} />
        	<Route  path='/search/:type' component={SearchPage} />
          <Route exact path='/collect' component={CollectPage} />
          <Route  path='/explore' component={ExploreModal} />
          <Route path='/detail/:type/:id' component={DetailCard} />
          <Route path='/user' component={UserPage} />
          <Route component={NoMatch} />
          </Switch >   
        </ScrollToTop>
        <Route  path='/search/:type/:key' component={ModalContainer} />
  		      
      </section>

)

export default withRouter(connect(null,(dispatch)=>({
  showTrends:()=>{dispatch(showTrends(false))}
})

)(MainPage))