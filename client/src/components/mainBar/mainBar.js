import React from 'react';
import {Icon} from 'semantic-ui-react';
import {NavLink,withRouter } from 'react-router-dom'
import SearchBar from '../../containers/searchBarContainer'
import Trends from '../trends'
import './mainBar.css'

import {connect} from 'react-redux'
import img from '../../media/相机.png'

class MainBar extends React.PureComponent{
  constructor(props){
    super(props)
    this.state={
       hasScroll:false,
       showTrends:false,
       activeIndex:1,
    }
    this.handleScroll=this.handleScroll.bind(this)
  }
    componentDidMount(){
      this.time=setTimeout(this.handleScroll,1000/16)
    }
    handleScroll(){
      this.time=setTimeout(this.handleScroll,1000/6)
      let scrollY=window.scrollY?window.scrollY:document.documentElement.scrollTop,
          className=document.body.className,
          hasScroll=this.state.hasScroll
      if(scrollY===this.pS){return}else{
        this.pS=scrollY
      }
      if(scrollY>70||className==='_mybody'){
        if(hasScroll)return;
        this.setState({
          hasScroll:true
        })
      }else{
        if(!hasScroll)return;
        this.setState({
          hasScroll:false
        })
      }
    }
 componentWillUnmount(){
  clearTimeout(this.time)
 }
  　render(){
     let {activeIndex}=this.state,
         {screen}=this.props,
         width=screen.toJS().width;
          
    return (
      <nav ref={(r)=>this.nav=r} className='_mbct' style={{width:'100%',background:'white'}}>
	    <div className={this.state.hasScroll?'_navbar _navbarc':'_navbar'}>
        <div className='_navl' >
        <NavLink className='_LogoLink' to='/collect'>
         <Icon as='img' style={{fontSize:'30px',width:'35px',height:'35px'}} src={img}  />
          <span  className={this.state.hasScroll?'_A1 _A1C':'_A1'}>lifecams</span>
          </NavLink>
        </div>
        <div className='_mbsc' >
       	<SearchBar/>
        </div>
      	<div className='right' position='right'>
        <NavLink className='_barcon _collecIcon' isActive={(match, location)=>{if(match)this.setState({activeIndex:1})}}  to='/collect'>
           <i className ={width<=545?(activeIndex===1?"iconfont  icon-home":"iconfont  icon-zhuye"):"iconfont  icon-zhuye"}></i>
         </NavLink>
      	<NavLink className='_barcon' isActive={(match, location)=>{if(match)this.setState({activeIndex:2})}} to='/search/image'>
         <Icon className="_A2 _Myicon" size='large'  name={width<=545?(activeIndex===2?'compass':'compass outline'):'compass outline'} />
         
         </NavLink>
          <div className='_barcon _likesIcon'   >
         <Icon className='_A2 _noLink _Myicon'  onClick={(e)=>{e.stopPropagation();this.setState((pres)=>({showTrends:!pres.showTrends}))}}  size='large'  name='heart outline' >
            {this.state.showTrends?<React.Fragment><Trends/><div onClick={(e)=>{e.stopPropagation();this.setState({showTrends:false})}} className='_handleShow'></div></React.Fragment>:''}
         </Icon>
         </div>
         <NavLink className='_barcon' isActive={(match)=>{if(match)this.setState({activeIndex:4})}} to='/user'>
         <Icon className="_A2 _Myicon" size='large'  name={width<=545?(activeIndex===4?'user ':' user outline'):'user outline '} />
         </NavLink>
          
        </div>
      </div>
      </nav>)
  }
 }
export default withRouter(connect(
(state)=>({
  screen:state.getIn(['input','screen'])
})
)(MainBar))