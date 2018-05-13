import React from 'react';
import LoginPage from '../loginPage';


const SwitchC = ({ isAuthorized })=>{
	console.log(isAuthorized)
   return  <div>{isAuthorized ?(<div>LoginSE</div>):(<LoginPage/>)}</div>
}


export default SwitchC