import React from 'react'
import './collectPage.css'
import CollectExplore from '../collectExplore/collectExplore.js'
class CollectPage extends React.Component{
	constructor(props){
	   super(props)
	}
	render(){
		return (
			<main className='_cpmain'>
			<section className='_clpg'>
			  
				<CollectExplore/>
			</section>
			</main>
		)
	}
}
export default CollectPage