import React from 'react';
import './exploreModal.css'
import ExploreBox from './exploreBox'
import {connect} from 'react-redux'
import {Route,withRouter,Switch} from 'react-router-dom'
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import WebAPI from '../../utils/WebAPI'
class ExploreModal extends React.PureComponent{
		constructor(props){
			super(props)
			this.state={
				direction:'rtl',
				entered:false,
			}
			this.props.fetchCollect(this.props.collect)
		}
		componentDidMount(){
			
		}
		handle=(d,index)=>{
			this.setState({direction:d},()=>{this.props.history.push('/explore/'+index)})
		}
		render(){
			const {screen,location} =this.props
			
		
		   
		return (
			    
				 <section  className='_exml' style={{height:screen.toJS().height}}>
				 		<TransitionGroup className='_exmlmain'>
					      <CSSTransition
					        key={location.key}
					        classNames={this.state.direction}
					        timeout={500}
					        onEnter={()=>this.setState({entered:false})}
					        onEntered={()=>this.setState({entered:true})}

					      >
					       	<Switch location={location}>
					         <Route  exact path='/explore/:id' render={({...rest})=><ExploreBox entered={this.state.entered} handle={this.handle} {...rest}/>}/>)
					          
					        </Switch>
					      </CSSTransition>
					    </TransitionGroup>
						
				 </section>
			 
			)
		}
	
}

export default withRouter(connect(
	(state)=>({
	screen:state.getIn(['input','screen']),
	collect:state.getIn(['user','collect']).toJS().filter((a)=>a.type==='video').map((a)=>a.id),
	fetching:state.getIn(['input','fetching']),
	fetchCollect:state.getIn(['user','fetchCollect'])
    }),
    (dispatch)=>({
    	fetchCollect:(collect)=>{
    		WebAPI.fetchCollect(dispatch,collect)
    	}
    })


 )(ExploreModal))



// <TransitionGroup className='_exmlmain'>
// 				 			<CSSTransition key={location.key} className='fsaf' timeout={1000}>
// 				 	          <Switch location={location}>
// 				 	               		<Route path='/explore/:id'   render={({match,...rest})=><ExploreBox match={match} {...rest} />}   />
// 				 	 			</Switch>	
				 	   				
// 				 	            </CSSTransition>
				 	          
// 					</TransitionGroup>
// onClick={(e)=>{
// 				 	if(e.target.innerHTML==='＞'){this.setState({direction:'rtl'})}
// 				 else if(e.target.innerHTML==='＜'){this.setState({direction:'ltr'})}}}