import React from 'react';
import {Container,Menu,Statistic} from 'semantic-ui-react';
 const BottomBar =()=>(
    
    <Menu  secondary>
    <Container>
      <Menu.Item > <Statistic size='mini' value='博客' text /></Menu.Item>
      <Menu.Item > <Statistic size='mini' value='关于我们' text /></Menu.Item>
      <Menu.Item > <Statistic size='mini' value='支持' text /></Menu.Item>
       <Menu.Item > <Statistic size='mini' value='新闻中心' text /></Menu.Item>
        <Menu.Item > <Statistic size='mini' value='Api' text /></Menu.Item>
         <Menu.Item > <Statistic size='mini' value='目录' text /></Menu.Item>
          <Menu.Item > <Statistic size='mini' value='个人主页' text /></Menu.Item>
           <Menu.Item > <Statistic size='mini' value='隐私' text /></Menu.Item>

     </Container>
    </Menu>
   
)
 export default BottomBar