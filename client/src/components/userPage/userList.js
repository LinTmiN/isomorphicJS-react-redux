import React from 'react'
import {Icon,Loader} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Route,Switch,NavLink,withRouter} from 'react-router-dom'
import img from '../../media/userNone.jpg'

import List from './list.js'


class LikesList extends React.PureComponent{
	render(){
		let {show,likesList}=this.props
		return (
			<React.Fragment>{show?<List  mylist={likesList} />:(<div key='0' className="_userpagelikes">
		<div className="_userNonelikes">
			<img alt={'empty likeslist'} src={img}/>
		</div>
		<div className='_userpagelikesD'>
			<h3>捕捉你欣赏的每一张照片。</h3>
			<span>下载应用，收藏你的首张照片或视频。</span>
			<div>
				<div className="_dn">
					<img  alt={'google play store'} src='uploads/homepage/gg.png'/>
				</div>
				<div className="_dn">
					<img alt={'app store'} src='uploads/homepage/ap.png'/>
				</div>
			</div>
		</div>					
	</div>)}</React.Fragment>
		)
	}
}
class CollectList extends React.PureComponent{
	render(){
		let {show,collectList}=this.props
		return (
			<React.Fragment>{show?(<React.Fragment>
		<div className='_collectTips'>你收藏的内容只对自己可见</div><List to='/detail/' mylist={collectList} /></React.Fragment>
		):(<div key='1' className='_collectnone'>
				<div className='_colletnoneIcon'><Icon name='bookmark outline'/></div>
				<h3>收藏</h3>
				<div className='_nonep'>收藏感兴趣的照片和视频，方便再次查看。收藏内容只对你可见，且不会通知任何人。</div>
			</div>)}</React.Fragment>
		)
	}
}
const CollectListRou=withRouter(CollectList);
const LikesListRou=withRouter(LikesList)
class UserList extends React.PureComponent{
	constructor(props){
		super(props)
	
		this.state={
			url:this.props.location.pathname.indexOf('/collect')===-1?true:false
		}
	}
	componentDidUpdate(){
		let lazyImages = [].slice.call(document.querySelectorAll(".img-small"));
      lazyImages.forEach((lazyImage)=>{
        this.InterSectionObserver.observe(lazyImage)
      })
		this.setState({
			url:this.props.location.pathname.indexOf('/collect')===-1?true:false
		})
	}
	componentWillUnmount(){
		
		this.InterSectionObserver.disconnect()
	}
	componentDidMount(){
		 let that=this;
    that.InterSectionObserver=new IntersectionObserver((entries)=>{
        
       entries.forEach((entry)=>{
            if(entry.isIntersecting){
                if(entry.target.dataset.src){
                  let lazyImage = entry.target,
                      newImg=new Image();
                      newImg.src=lazyImage.dataset.src;
                      newImg.srcset=lazyImage.dataset.srcset;
                      newImg.onload=()=>{
                         lazyImage.src=lazyImage.dataset.src;
                         lazyImage.srcset=lazyImage.dataset.srcset;
                         lazyImage.classList.remove('img-small');
                         lazyImage.classList.add('img-end');
                         that.InterSectionObserver.unobserve(lazyImage);
                      }

                }
            }
       })
    },{threshold:[0,0.25,0.5,0.75,1]})
      let lazyImages = [].slice.call(document.querySelectorAll(".img-small"));
      lazyImages.forEach((lazyImage)=>{
        this.InterSectionObserver.observe(lazyImage)
      })
	}
   
    render(){
    	
    	let width=this.props.screen.width;
		let	{likes,collect}=this.props.userInfo.toJS(),
			{myLikesInfo,myCollectInfo,load}=this.props;
			
    	return (
    		<React.Fragment>
    		<div className='_usptab'>
			 	<NavLink onClick={()=>this.setState({url:true})} className='_ustablink' to={{pathname:'/user',state:{keepTop:true}}}><span  className={this.state.url?'_uspmyLink _usptabhover':'_uspmyLink'}><Icon name='heart outline'/>{width<=725?'':"赞"}</span></NavLink>
			 	<NavLink onClick={()=>this.setState({url:false})} className='_ustablink' to={{pathname:'/user/collect',state:{keepTop:true}}}><span className={!this.state.url?'_uspmyLink _usptabhover':'_uspmyLink'}><Icon  name='bookmark outline'/>{width<=725?'':"收藏夹"}</span></NavLink>
			 </div>
			 <article  style={{position:'relative'}}>
			 {load?<Loader style={{margin:'65px auto',zIndex:'99'}} inline='centered'  active  />:<Switch>
			  	
				  	<Route exact path='/user/collect' render={()=><CollectListRou show={collect.length!==0}  width={width} collectList={myCollectInfo.toJS().reverse()}  />} />
				  	<Route   path='/user' render={()=><LikesListRou width={width} show={likes.length!==0} likesList={myLikesInfo.toJS().reverse()}/>} />
				</Switch>}
			  	
			</article>
			</React.Fragment>
    	)
    }
}

export default withRouter(connect(
	(state)=>({
		screen:state.getIn(['input','screen']).toJS(),
		userInfo:state.getIn(['user','userInfo']),
		myCollectInfo:state.getIn(['user','myCollectInfo']),
		myLikesInfo:state.getIn(['user','myLikesInfo']),
	}),
	(dispatch)=>({
		
	})
)(UserList))