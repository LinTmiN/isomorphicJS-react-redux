import React from 'react'
import CollectCard from '../collectCard'
import './collectExplore.css'
class CollectExplore extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			
				<section className='_cect'>
					<CollectCard/>
				</section>
			
		)
	}
}
export default CollectExplore