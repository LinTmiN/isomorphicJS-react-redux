import React from 'react';
import LoginPage from '../loginPage';
import MainPage from '../mainPage'

const SwitchC = ({ isAuthorized })=>{
	var isAuthorized=true
   return  <div>{isAuthorized ?(<MainPage/>):(<LoginPage/>)}</div>
}


export default SwitchC