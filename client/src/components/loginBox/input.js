import React from 'react'

class MyInput extends React.Component{
	constructor(props){
		super(props)
		this.state=this.props.value?{focus:false,type:'password'}:{
			focus:false,
			type:'password',
			value:''
		}
	}
	render(){
		let {passwordShowhide,icon,value,placeholder,inputType,onBlur,onFocus,onChange,...rest}=this.props
		
		return (
			<div className={this.state.focus?'_inputcontain _myinputfocus':'_inputcontain'}>
			<div className="_myinput"> 
     			 <label  className={value!==undefined?(value.length===0?"_myinputlabel":'_myinputlabel _myinputlabelfocus'):(this.state.value.length===0?'_myinputlabel':'_myinputlabel _myinputlabelfocus')} htmlFor={inputType+Date.now()}>{placeholder}</label>
		      		<input  className={value!==undefined?(value.length===0?"":'_input'):(this.state.value.length===0?'':'_input')}  
		        		id={inputType+Date.now()}
		        		{...rest}
		        		onChange={(e)=>{if(onChange){onChange(e)};if(!value){this.setState({value:e.target.value})}}}
		        		value={value!==undefined?value:this.state.value}  
		        		onFocus={(e)=>{if(onFocus){onFocus(e)};this.setState({focus:true})}}
		        		onBlur={(e)=>{if(onBlur){onBlur(e)};this.setState({focus:false})}}             
		        		type={inputType==='password'?this.state.type:inputType}/>
		         
		        </div>
		        <div className='_ipdivb'>
		         {icon?icon:null}
		        {passwordShowhide?(inputType==='password'?(value!==undefined?(value.length===0?"":<button className='_passwordshow' type='button' onClick={(e)=>{e.stopPropagation();this.setState((s)=>({type:s.type==='text'?'password':'text'}))}} >{this.state.type==='text'?'隐藏':'显示'}</button>):(this.state.value.length===0?'':<button className='_passwordshow' type='button' onClick={()=>this.setState((s)=>({type:s.type==='text'?'password':'text'}))} >{this.state.type==='text'?'隐藏':'显示'}</button>)):''):null}
		        
		        </div>
		     </div>
		)
	}
}
export default MyInput
