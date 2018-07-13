import React from 'react';
import {Menu ,Button} from 'semantic-ui-react'
import './loginBar.css'
 const Loginbar=()=>(
     <Menu className='loginBackground' inverted secondary >
      <Menu.Item >
        <p style={{textAlign:'left',color:'white'}}><span style={{fontWeight:'bold',fontSize:'15px'}}>REXtube</span><br />find your favorite img</p>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item name='home' active={false} ><Button basic inverted style={{color:'white'}}>下载</Button></Menu.Item>
      </Menu.Menu>
    </Menu>

)
 export default Loginbar