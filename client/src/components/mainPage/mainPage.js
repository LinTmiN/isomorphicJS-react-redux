import React from 'react';
import 'intersection-observer'
import MainBar from '../mainBar';
import { Route,Switch,withRouter,Redirect } from 'react-router-dom'


import {connect} from 'react-redux'
import {showTrends} from '../../actions'
import '../../commoncss.css'
import '../../responsiveCss.css'
import './sf.css'

import Loadable from 'react-loadable';
function Loading(props) {
  if (props.error) {
    return <div className='_asycload'>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.timedOut) {
    return <div className='_asycload'>Taking a long time... <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.pastDelay) {
    return <div className='_asycload'>Loading...</div>;
  } else {
    return null;
  }
}
const ModalContainer=Loadable({
  loader:()=>import('../../containers/modalContainer'),
  loading:Loading,
})
const CollectPage =Loadable({
  loader:()=>import('../collectPage'),
  loading:Loading,
})
const DetailCard=Loadable({
  loader:()=>import('../detailCard'),
  loading:Loading,
})

const Accounts=Loadable({
  loader:()=>import('../accounts'),
  loading:Loading,
})
const ScrollToTop=Loadable({
  loader:()=>import('../scrollToTop'),
  loading:Loading,
})
const SearchPage=Loadable({
  loader:()=>import('../searchPage'),
  loading:Loading,
})

const ExploreModal=Loadable({
  loader:()=>import('../exploreModal'),
  loading:Loading,
})


const UserPage=Loadable({
  loader:()=>import('../userPage'),
  loading:Loading,
 
})
class NoMatch extends React.Component{
  render(){
      return <div style={{paddingTop:'135px'}}>很抱歉，页面不存在</div>
  }
}
class MainPage extends React.Component{
  
   render(){  
    let {showTrends}=this.props 
    return (
    <section className='_allcontain' >
       <ScrollToTop>
          <MainBar/>
          <Switch> 
          <Route exact path='/' render={()=>{return <Redirect to='/collect' />}} />
        	<Route  path='/search/:type' component={SearchPage} />
          <Route exact path='/collect' component={CollectPage} />
          <Route  path='/explore' component={ExploreModal} />
          <Route path='/detail/:type/:id' component={DetailCard} />
          <Route path='/user' component={UserPage} />
          <Route path='/accounts/:type' component={Accounts} />
          <Route component={NoMatch} />
          </Switch >   
        </ScrollToTop>
        <Route   path='/user/:type/:key' component={ModalContainer} />
  		   <Route  path={`/search/:type/:key`}  component={ModalContainer} />   
      </section>)
    }

}
export default withRouter(MainPage)