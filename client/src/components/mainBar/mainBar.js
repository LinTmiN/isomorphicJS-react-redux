import React from 'react';
import {Icon} from 'semantic-ui-react';
import {NavLink } from 'react-router-dom'
import SearchBar from '../../containers/searchBarContainer'
import './mainBar.css'
class MainBar extends React.Component{
  constructor(props){
    super(props)
    this.state={
       hasScroll:false
    }
    this.handleScroll=this.handleScroll.bind(this)
  }
    componentDidMount(){
      window.addEventListener('scroll',this.handleScroll)
    }
    handleScroll(){
      
      if(window.scrollY>0||document.body.className==='mybody'){
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
         <Icon style={{fontSize:'30px'}} size='big'  name='openid' />
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
          <NavLink to=''>
         <Icon className="_A2" size='large'  name='heart outline' />
         </NavLink>
         <NavLink to=''>
         <Icon className="_A2" size='large'  name='user outline' />
         </NavLink>
        </div>
      </div>
      </nav>)
  }
 }
export default MainBar 