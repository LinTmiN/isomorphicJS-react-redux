import mongoose,{ Schema } from 'mongoose';
let emailValidate=(email)=>{

}
export default mongoose.model('User',new Schema({
	avatar:{type:String,default:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526794815615&di=4c65564f4905e64e267f80d6b4f16082&imgtype=0&src=http%3A%2F%2Fsnowcoal.com%2Fimage%2Fportrait%2Fdefault_header.jpg'},
	username:{type:String,required:true},
	email:{type:String,required:true},
	password:{type:String,required:true},
	collect:Array,
	likes:Array,
	trends:Array

}))