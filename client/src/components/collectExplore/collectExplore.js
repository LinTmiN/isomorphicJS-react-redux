import React from 'react'
import CollectCard from '../collectCard'
import './collectExplore.css'
class CollectExplore extends React.Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.props.getCollect()
	}
	render(){
		let boxList=this.props.collect.toJS().map((item,index)=>{
			return <CollectCard key={index} id={item.id} type={item.type}/>
		})
		return (
				
				<section className='_cect'>
				    {boxList.reverse()}
				</section>
			
		)
	}
}

export default CollectExplore