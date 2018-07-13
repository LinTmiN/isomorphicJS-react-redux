import mongoose,{ Schema } from 'mongoose';

export default mongoose.model('User',new Schema({
	avatar:{path:{type:String,required:true,trim:true,default:"/uploads/user.jpg"},size:Number},
	id:{type:String,required:true,unique:true},
	username:{type:String,required:true,unique:true},
	email:{type:String,required:true,unique:true},
	password:{type:String,required:true},
	collect:Array,
	likes:Array,
	trends:Array,
	selfIro:'',
  	webSite:'',
  	sex:'',
  	phone:''	

}))