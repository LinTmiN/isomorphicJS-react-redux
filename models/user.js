import mongoose,{ Schema } from 'mongoose';
export default mongoose.model('User',new Schema({
	avatar:String,
	username:String,
	email:String,
	password:String,
	collect:Array,

}))