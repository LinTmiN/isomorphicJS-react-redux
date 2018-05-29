import React from 'react'
import LoginBar from '../loginBar';
import LoginBox from '../../containers/loginBoxContainer';
import BottomBar from '../bottomBar';
import {connect} from 'react-redux'
export default ()=>(
   <div>
   	<LoginBar/>
   	<LoginBox/>
    <BottomBar/>
   </div>
)
