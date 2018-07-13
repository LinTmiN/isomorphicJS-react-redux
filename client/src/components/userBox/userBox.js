import React from 'react'
import './userBox.css'
import UserBoxty from './userBoxm'


class UserBox extends React.PureComponent{
	constructor(props){
		super(props)
		this.state={width:0}

	}
	componentDidMount(){
		if(this.props.width>725){
			
				this.setState({width:(this.myref.clientWidth-56)/3})
		}else{
			this.setState({width:(this.myref.clientWidth-6)/3})
		}
	}
   componentDidUpdate(preP){

		if(this.props.width!==preP.width){
			if(this.props.width>725){
				this.setState({width:(this.myref.clientWidth-56)/3})
		}else{
			this.setState({width:(this.myref.clientWidth-6)/3})
		}
			
		}
		
	}
	render(){
		let {arr,to}=this.props;	
		arr.push(...Array.apply(null,{length:3-arr.length}))
		let arrList=arr.map((item,index)=>{if(!item){return <div key={index} className='_uspboxm _usb'></div>};return <UserBoxty to={to} key={index} data={item}/>})
			
		return (

			 <div ref={(r)=>this.myref=r} className='_uspbox'>
			 	 {arrList}
			 </div>
		)
	}
}

export default UserBox