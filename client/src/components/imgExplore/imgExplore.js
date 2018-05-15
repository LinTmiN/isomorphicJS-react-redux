import React from "react";
import "./explore.css";
import {Dimmer ,Segment,Header,Icon,Image} from 'semantic-ui-react'
import ImgBox from '../imgBox'


class ImgExplore extends React.Component {
	constructor(props){
		super(props)
		this.myref=React.createRef()
	}
	onScrollhandler(){
		const {bottom}=this.myref.current.getBoundingClientRect()
	}
	componentDidMount(){
		// window.addEventLister('scroll',)
		const {bottom}=this.myref.current.getBoundingClientRect()
		const scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		const bodyH=document.body.clientHeight;
		if(bottom-(scrollTop+bodyH/2)<500){
			this.props.firstResult()
		}
		
	}
	render(){
		const imgBoxList=this.props.results.map((i,index)=>(<ImgBox key={index} info={i}/>))
		return (
		<article ref={this.myref}  className='iep1'>
			<h1>Explore</h1>
		 	<div className='imgExplore'>
		 		{imgBoxList}
		  	</div>
		</article>

		)
	}
}
// const ImgExplore = ({results}) => {
//     const imgBoxList=results.map((i,index)=>(<ImgBox key={index} info={i}/>))
// 	return(
// 	<article ref={this.myref} className='iep1'>
// 		<h1>Explore</h1>
// 	 	<div className='imgExplore'>
// 	 		{imgBoxList}
// 	  	</div>
// 	</article>
// 	)
// }

export default ImgExplore;
