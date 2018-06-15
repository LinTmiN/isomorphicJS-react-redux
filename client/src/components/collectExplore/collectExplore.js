import React from 'react'
import CollectCard from '../collectCard'
import './collectExplore.css'
class CollectExplore extends React.PureComponent{
	constructor(props){
		super(props)
		this.state={
			boxList:[]
		}
		
	}

	componentDidMount(){
		
		this.props.getCollect()
	
 	
	}

	render(){
		let boxList=this.props.collect.toJS().map((item,index)=>{
			return <CollectCard index={index} key={item.id} id={item.id} type={item.type}/>
		})
		return (
				
				<section className='_cect'>
				    {boxList.length===0?<span style={{fontSize:'25px',color:'#999',marginTop:'80px'}}>你还没有任何收藏</span>:boxList.reverse()}
				</section>
			
		)
	}
}

export default CollectExplore