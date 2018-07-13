import {connect} from 'react-redux';
import { isCardInit } from '../../actions'
import ImgBox from '../../components/imgBox'
import VideoBox from '../../components/videoBox'
export const ImgBoxContainer =connect(
	null,
	 (dispatch)=>({
	 	isCardInit:()=>{
	 		dispatch(isCardInit(false))
	 	}
	 })
)(ImgBox)
export const VideoBoxContainer = connect(
	null,
	(dispatch)=>({
		isCardInit:()=>{
			dispatch(isCardInit(false))
		}
	})

	)(VideoBox)