import React from 'react';
import ReactDOM from 'react-dom'
import './modal.css';
import { Image ,Icon} from 'semantic-ui-react'
const modalroot = document.getElementById('modal-root');
class Modal extends React.Component{
	constructor(props){
		super(props)
		this.el=document.createElement('div')
	}
	componentDidMount(){
		modalroot.appendChild(this.el)
		document.body.className='modalBody'
	}
	componentWillUnmount(){
		modalroot.removeChild(this.el)
		document.body.className=''
	}
	render(){
		const {match} =this.props
		console.log(match.params.type==='image')
		let myChild;
		myChild=match.params.type==='image'?(
			<div className='mymodal'>
				<div className='dBox' >
					<div className='imgCG'>
						<img  src='https://scontent-hkg3-2.cdninstagram.com/vp/0e1a7b4b0ea868be9444deef3e09f671/5B86D4EE/t51.2885-15/e35/32443541_564522920583600_3712906481868210176_n.jpg'/>
					</div>	
					<div className='commentBox'>
						<div className='_usif'>
							<Image className='_usim' size='mini' avatar src='https://cdn.pixabay.com/user/2018/05/13/09-44-12-439_250x250.jpg' />
							<h1> User Name <span> · </span> <a href='#'>关注</a></h1>
							<h3>sub name</h3>
						</div>
						<div className='_usic'>
							<Icon  style={{margin:'0 10px'}} size='big' name='heart outline'/>
							<Icon  size='big' name='comment outline'/>
							<Icon style={{float:'right',marginRight:'10px'}} size='big' name='remove bookmark'/>
						</div>	
					</div>
				</div>
			</div>
		):'';
		return ReactDOM.createPortal(
			myChild,
			this.el
		)
	}

}
export default Modal