import React from 'react'
import UserBox from '../userBox'
import {withRouter} from 'react-router-dom'

class List extends React.PureComponent{
	 toList(arr){
	 	if(!arr)return 
		return arr.reduce((a,b,index)=>{
			if(index%3===0){
				let itemsarr=[];
				itemsarr.push(b);
				a.push(itemsarr)
			}else{
				a[Math.floor(index/3)].push(b)
			};
			return a
		},[])
	}
	
	render(){
		let {mylist,to}=this.props;
		     if(typeof mylist[0]==='object'){mylist[0].index='1'}
		let list=this.toList(mylist).map((item,index)=>{return <UserBox to={to} key={index} arr={item}/>});
			
			
		return (
				<React.Fragment>{list}</React.Fragment>
		)
	}
}
export default withRouter(List)