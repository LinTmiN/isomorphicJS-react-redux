import React from 'react';
import {Container,Menu,Statistic} from 'semantic-ui-react';
 const BottomBar =()=>(
    
    <Menu  fixed='bottom' secondary>
    <Container>
      <Menu.Item > <Statistic size='mini' value='博客' text /></Menu.Item>
      <Menu.Item > <Statistic size='mini' value='关于我们' text /></Menu.Item>
      <Menu.Item > <Statistic size='mini' value='Api' text /></Menu.Item>
     </Container>
    </Menu>
   
)
 export default BottomBar