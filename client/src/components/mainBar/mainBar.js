import React from 'react';
import { Menu ,Icon,Container} from 'semantic-ui-react';
import SearchBar from '../../containers/searchBarContainer'
import './mainBar.css'
const MainBar =()=>{
   const screenW=document.documentElement.clientWidth||document.body.clientWidth;
      let fid
    if (screenW<660){fid='bottom'} else{fid='top'}
     
    return (
	  <div >
	    <Menu  fixed={fid} borderless >
	   <Container>
        <Menu.Item >
         <Icon size='big'  name='openid' />
          <span  className='_A1'>PoorIns</span>
        </Menu.Item>
        <Menu.Item className='search2' >
       	<SearchBar />
        </Menu.Item>
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
    </Container>

      </Menu>
      </div>
)}
export default MainBar 