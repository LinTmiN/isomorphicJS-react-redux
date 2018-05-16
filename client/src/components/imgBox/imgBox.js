import React from 'react';
import {Image,Dimmer,Icon,Header} from 'semantic-ui-react';
import './imgBox.css';
import LazyLoad from 'react-lazyload'
class ImgBox extends React.Component{
	constructor(props){
		super(props)
		this.state={
			showDimmer:false
		}
		
	}
	handleShow=()=>this.setState((s)=>{
		return {showDimmer:true}})	

	handleHide=()=>this.setState({showDimmer:false})
	shouldComponentUpdate(nS,nP){
		if(this.props!=nP||this.state!=nS){
			return true
		}else{
			return false
		}

	}

	render(){		
		return (
			<div   className='flexitem'>
	 			<Dimmer.Dimmable style={{height:'100%',zIndex:'10'}} onMouseEnter={this.handleShow} onMouseLeave={this.handleHide} as={Image} dimmed={this.state.showDimmer}>
	  			 	<Dimmer active={this.state.showDimmer}>
            		<Header as='h2' icon inverted>
              		<Icon name='heart' />
             			 like:{this.props.info.favorites}
            		</Header>
          			</Dimmer>
          			<img src={this.props.info.webformatURL} />
          			
				</Dimmer.Dimmable>
       		</div>
		)
	}
	

}
export default ImgBox

			

