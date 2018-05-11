import mongoose,{ Schema } from 'mongoose';
export default mongoose.model('User',new Schema({
	id:Number,
	avatar:String,
	username:String,
	email:String,
	password:String,
	collect:Array,

}))