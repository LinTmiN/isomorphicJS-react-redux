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
		if(this.props.collect.toJS().length<=0){
		this.props.getCollect()
	}
 	
	}

	render(){
		let boxList=this.props.collect.toJS().map((item,index)=>{
			return <CollectCard index={index} key={item.id} id={item.id} type={item.type}/>
		})
		return (
				
				<section className='_cect'>
				    {boxList.reverse()}
				</section>
			
		)
	}
}

export default CollectExplore