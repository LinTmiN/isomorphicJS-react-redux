import mongoose,{ Schema } from 'mongoose';
let emailValidate=(email)=>{

}
export default mongoose.model('User',new Schema({
	avatar:{type:String,default:'../client/src/media/user.jpg'},
	username:{type:String,required:true},
	email:{type:String,required:true},
	password:{type:String,required:true},
	collect:Array,
	likes:Array,
	trends:Array

}))