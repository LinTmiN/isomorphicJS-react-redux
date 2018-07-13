import React from 'react';
import './trends.css'
import TrendBox from './trendBox'
import {Icon,Loader} from 'semantic-ui-react'
import {connect} from 'react-redux'
import WebAPI from '../../utils/WebAPI'
class Trends extends React.Component{
	constructor(props){
		super(props)
		this.state={loading:true}
	}
	componentDidMount(){
		this.props.getTrends()
	}
	render(){
		let {trends,isGetTrends,screen}=this.props,
			trendsList=trends.map((trend,index)=><TrendBox key={index} trend={trend} />),
			width=screen.width>545?500:screen.width

		return (
			<React.Fragment>
				<div style={{width:width}} className='_trendsBox _responsiveTrendBox'>
				   <div className='_trendBoxContain'>
					  	{isGetTrends?(<div style={{paddingTop:'25px',paddingBottom:'25px'}}><Loader active inline='centered' /></div>):(trendsList.length===0?<div className='_trendsnone'><Icon style={{alignSelf:'center',fontWeight:'normal',fontSize:'45px'}} size='huge' name='heart outline'/><span>帖子动态</span><span>你收藏或点赞的帖子会显示在这里</span></div>:trendsList.reverse())}
					</div>
				</div>
				<div className='_jiao _responsivejiao'>	
				</div> 
				<div className='_kuang __responsivekuang'>	
				</div>
			</React.Fragment>
		)
	}
}

export default connect(
	(state)=>({
		trends:state.getIn(['user','trends']).toJS(),
		isGetTrends:state.getIn(['user','isGetTrends']),
		screen:state.getIn(['input','screen']).toJS()
	}),
	(dispatch)=>({
		getTrends:()=>{
			WebAPI.getTrends(dispatch)
		}
	})
)(Trends) ;