import React from 'react';
import './collectCard.css';
import {connect} from 'react-redux';
import {Icon } from 'semantic-ui-react'
import axios from 'axios'
import faker from 'faker'
class CollectCard extends React.Component{
	constructor(props){
		super(props)
		this.state={
			info:{},
			comment:[],

		}
	}
	componentDidMount(){
		if(type==='image'){
			let fakeComment=Array.apply(null,{length:Math.round(Math.random()*100)}).map((a)=>({username:faker.name.findName(),text:faker.lorem.sentence()})),
			    fakeinfo = {username:faker.name.findName(),avatar:faker.image.avatar(),likes:faker.random.number()}
			    this.comment=fakeComment
			    this.setState({
			    	info:fakeinfo,
			    	comment:this.comment[0,4]
			    })
		}
	}
	render(){
		let height= this.props.screen.toJS().width>=600?'337.5px':this.props.screen.toJS().width*9/16+'px'
		return ( 
		<article className='_cdbg'>
			<header className='_cdhd'>
				<div className='_usava'><div className='_usava2'><img src='https://scontent-frx5-1.cdninstagram.com/vp/e3a973c135486d68d4683ae5382f3aa3/5B97E97B/t51.2885-19/s150x150/31175923_375780796253246_7107163692164186112_n.jpg'/></div></div>
				<div className='_usnm'><h1>the Weenknd</h1></div>
			</header>
			<div className='_cdim' >
				<iframe style={{width:'100%',height:height}} src={"https://player.vimeo.com/video/83860232?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=126886"} 
				 frameBorder="0" title="flow" webkitallowfullscreen='true' mozallowFullscreen='true' allowFullscreen='true'></iframe>
			</div>
			<div className='_cdall'>
				<div className='_cdicon'>
					<Icon size='big' name='heart outline'/>
					<Icon style={{paddingLeft:'10px'}} size='big' name='comment outline' />
					<Icon size='big' name='remove bookmark' className='_cdicr'/>
				</div>
				<div className='_cdlk'>
					431,560赞
				</div>
				<div className='_cdcm'>
					<ul>
					   <li><span className='_cdusname'>poster</span>sssssseqweqfqwr</li>
					   <li style={{fontSize:'14px',fontWeight:'400',color:'#999',cursor:'pointer'}}>Load more comment</li>
					   <li><span className='_cdusname'>username</span>sssssseqweqfqwr</li>	
					   	
					   <li><span className='_cdusname'>username</span>sssssseqweqfqwr</li>	
					   
					</ul>
				</div>
				<div className='_cdta'>
				<form>
					<textarea placeholder='添加评论...' className='_cdtai' ></textarea>
					</form>
				</div>
			</div>
		</article>
		)
	}
}
const mapStatetoProps=(state)=>({
	screen:state.getIn(['input','screen'])
})
export default connect(mapStatetoProps)(CollectCard)