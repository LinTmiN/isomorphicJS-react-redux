import React from 'react';
import { Menu ,Icon,Container} from 'semantic-ui-react';
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
      <div className='_mbct' style={{width:'100%',background:'white'}}>
	    <nav className={this.state.hasScroll?'_navbar _navbarc':'_navbar'}>
        <div className='_navl' >
         <Icon style={{fontSize:'30px'}} size='big'  name='openid' />
          <span  className={this.state.hasScroll?'_A1 _A1C':'_A1'}>REXtube</span>
        </div>
        <div className='_mbsc' >
       	<SearchBar />
        </div>
      	<div className='right' position='right'>
      	<span className='_A2'>
         <Icon size='large'  name='spinner' />
         </span>
         <span className='_A2' >
         <Icon  size='large'  name='heart outline' />
         </span>
         <span className='_A2'>
         <Icon  size='large'  name='user outline' />
         </span>
        </div>
      </nav>
      </div>)
  }
 }
export default MainBar 