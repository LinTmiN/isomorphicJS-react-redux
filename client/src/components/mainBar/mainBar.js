import React from 'react';
import {Icon} from 'semantic-ui-react';
import {NavLink,withRouter } from 'react-router-dom'
import SearchBar from '../../containers/searchBarContainer'
import Trends from '../trends'
import './mainBar.css'
import {showTrends} from '../../actions'
import {connect} from 'react-redux'
import img from '../../media/favicon.svg'
class MainBar extends React.PureComponent{
  constructor(props){
    super(props)
    this.state={
       hasScroll:false,
       showTrends:false,
    }
    this.handleScroll=this.handleScroll.bind(this)
  }
    componentDidMount(){
      window.addEventListener('scroll',this.handleScroll)
    }
    handleScroll(){
      let scrollY=window.scrollY||document.documentElement.scrollTop
      if(scrollY>0||document.body.className==='mybody'){
        this.setState({
          hasScroll:true
        })
      }else{
        this.setState({
          hasScroll:false
        })
      }
    }

  　render(){
    return (
      <nav className='_mbct' style={{width:'100%',background:'white'}}>
	    <div className={this.state.hasScroll?'_navbar _navbarc':'_navbar'}>
        <div className='_navl' >
        <NavLink className='_LogoLink' to='/collect'>
         <Icon style={{fontSize:'30px',width:'35px',height:'35px'}} size='small' as='img' src={img} name='openid' />
          <span  className={this.state.hasScroll?'_A1 _A1C':'_A1'}>REXtube</span>
          </NavLink>
        </div>
        <div className='_mbsc' >
       	<SearchBar/>
        </div>
      	<div className='right' position='right'>
      	<NavLink to='/search/image'>
         <Icon className="_A2" size='large'  name='spinner' />
         
         </NavLink>
          
         <Icon onClick={(e)=>{e.stopPropagation();this.props.toggleTrends(!this.props.trends)}} className="_A2 _noLink" size='large'  name='heart outline' >
            {this.props.trends?<Trends/>:''}
         </Icon>
         <NavLink to='/user'>
         <Icon className="_A2" size='large'  name='user outline' />
         </NavLink>
        </div>
      </div>
      </nav>)
  }
 }
export default withRouter(connect(
(state)=>({
  trends:state.getIn(['input','showTrends'])
}),
 (dispatch)=>({
  toggleTrends:(payload)=>{
     dispatch(showTrends(payload))
  }
 })
)(MainBar))