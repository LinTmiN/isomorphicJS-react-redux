import Express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config';
import uuid from 'uuid/v1';
import multer from 'multer';
import path from 'path'
import fs from 'fs'
const app = new Express();
const apiRoutes = Express.Router();
app.set('superSecret',config.secret);
  var phones = {
    'ar-DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
    'ar-SY': /^(!?(\+?963)|0)?9\d{8}$/,
    'ar-SA': /^(!?(\+?966)|0)?5\d{8}$/,
    'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
    'cs-CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
    'de-DE': /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
    'da-DK': /^(\+?45)?(\d{8})$/,
    'el-GR': /^(\+?30)?(69\d{8})$/,
    'en-AU': /^(\+?61|0)4\d{8}$/,
    'en-GB': /^(\+?44|0)7\d{9}$/,
    'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
    'en-IN': /^(\+?91|0)?[789]\d{9}$/,
    'en-NZ': /^(\+?64|0)2\d{7,9}$/,
    'en-ZA': /^(\+?27|0)\d{9}$/,
    'en-ZM': /^(\+?26)?09[567]\d{7}$/,
    'es-ES': /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
    'fi-FI': /^(\+?358|0)\s?(4(0|1|2|4|5)?|50)\s?(\d\s?){4,8}\d$/,
    'fr-FR': /^(\+?33|0)[67]\d{8}$/,
    'he-IL': /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}/,
    'hu-HU': /^(\+?36)(20|30|70)\d{7}$/,
    'it-IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
    'ja-JP': /^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/,
    'ms-MY': /^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
    'nb-NO': /^(\+?47)?[49]\d{7}$/,
    'nl-BE': /^(\+?32|0)4?\d{8}$/,
    'nn-NO': /^(\+?47)?[49]\d{7}$/,
    'pl-PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
    'pt-BR': /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,
    'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
    'ru-RU': /^(\+?7|8)?9\d{9}$/,
    'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
    'tr-TR': /^(\+?90|0)?5\d{9}$/,
    'vi-VN': /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
    'zh-CN': /^(\+?0?86\-?)?1[345789]\d{9}$/,
    'zh-TW': /^(\+?886\-?|0)?9\d{8}$/
  };

apiRoutes.post('/login',function(req,res){
	User.findOne({
		email:req.body.email
	},(err,user)=>{
	 	if(err) throw err;
	 	if(!user){
	 		res.json({success: false,message:'你输入的帐号不属于任何帐户，请检查帐号并重试。'})
	 	}else if(user){
	 		if(user.password!=req.body.password){
	 			res.json({success: false,message:'密码错误'})
	 		}else{
	 			const token=jwt.sign({id:user.id},app.get('superSecret'),{
	 				expiresIn:60*60*24
	 			})
	 			let {username,email,webSite,selfIro,phone,sex,collect,trends,likes,avatar}=user
	 			res.json({success:true,message:'login success',token:token,user:{
	 				username,email,webSite,selfIro,phone,sex,collect,trends,likes,avatar
	 			},collect:user.collect})
	 		}
	 	}
	})
});


apiRoutes.post('/register',(req,res)=>{
	let {email,username,password}=req.body,
		errObj={validated:true,err:{}};
	if(!email||!username||!password){
		errObj.validated=false;
		!email?errObj.err.email={message:`${email?'':'邮箱、'}${username?'':'用户名、'}${password?'':'密码、'}不能为空`.replace(/、不能为空/,'不能为空')}:"";
		!username?errObj.err.username={message:`${email?'':'邮箱、'}${username?'':'用户名、'}${password?'':'密码、'}不能为空`.replace(/、不能为空/,'不能为空')}:""
		!password?errObj.err.password={message:`${email?'':'邮箱、'}${username?'':'用户名、'}${password?'':'密码、'}不能为空`.replace(/、不能为空/,'不能为空')}:"";
	}
	if(email&&!/^[A-Za-z0-9\_]+@[a-zA-Z0-9]+.[a-zA-Z]+$/g.test(email)){
		errObj.validated=false;
		errObj.err.email={message:'不是正确的邮箱格式'}
	}
	if (username&&!/^[A-Za-z0-9\_]{6,16}$/g.test(username)){
		errObj.validated=false;
		errObj.err.username={message:(username.length>=6&&username.length<=16)?'用户名含有非法符号':"用户名长度应在6到16位之间"}
	}
	if((password&&password.length<6||password.length>16)){
		errObj.validated=false;
		errObj.err.password={message:"密码长度应在6到16位 "}
	}


       if(errObj.validated){const newUser=new User({
         	  	    username:username,
         	  	    email:email,
         	  	    password:password,
                 	selfIro:'',
                 	webSite:'',
                 	id:uuid(),
                 	sex:'未指定',
                 	phone:''	   
       
                 	  });
                 	  newUser.save((err)=>{
                 	  	if(err){
                 	  		let message
                 	  		if(err.code===11000){
                 	  			if(/email/.test(err.message)){
                 	  				errObj.validated=false;
									errObj.err.email={message:'邮箱已存在'}
                 	  			}
                 	  			if(/username/.test(err.message)){
                 	  				errObj.validated=false;
									errObj.err.username={message:'用户名已存在'}
                 	  				}
                 	  		}else{
                 	  			errObj.validated=false;
                 	  		}
                 	  		
                 	  	return res.json({success:false,errObj:errObj})
                 	  }else{
                 	  	return res.json({success:true,message:'register success '})
                 	  }
       
                })
           }else{
           		return res.json({success:false,errObj:errObj})
           }
	
 
})
apiRoutes.post('/attempt',(req,res)=>{
	let errObj={validated:true,err:{}},
		{email,username,password}=req.body;
	if(!/^[A-Za-z0-9\_]+@[a-zA-Z0-9]+.[a-zA-Z]+$/g.test(email)){
		errObj.err.email=[{message:'不是正确的邮箱格式'}];
	    errObj.validated=false
	} 
	if (!/^[A-Za-z0-9\_]{6,16}$/g.test(username)){
		errObj.err.username=[{message:(username.length>=6&&username.length<=16)?'含有非法符号':"用户名长度应在6到16位之间"}];
		errObj.validated=false
		
	}
	if(password.length<6||password.length>16){
		errObj.err.password=[{message:'密码长度应在6到16位'}];
		errObj.validated=false	
	}
	User.findOne({"email":email},(err,user)=>{
		if(err) throw err

		if(user){		
			errObj.err.email=[{message:'邮箱已存在'}];
		    errObj.validated=false
		}
		User.findOne({"username":username},(err,user)=>{
		if(err) throw err
			
		if(user){
			errObj.err.username=[{message:'用户名已存在'}];
		    errObj.validated=false
		}
		res.json(errObj)
	})
	})



})
apiRoutes.use((req,res,next)=>{
	var token = req.body.token || req.query.token ||req.headers['x-access-token'];
	if(token){
		jwt.verify(token,app.get('superSecret'),(err,decoded)=>{
			if(err){
				return res.json({success:false,message:'Failed to authenticate token'})
			}else{
				
				if(decoded.exp<(Math.floor(Date.now()/1000))){return res.json({success:false,message:'token 过期'}) }
				
				req.decoded=decoded;
				
				next()
			}
		})
	}else {
		return res.status(403).send({
			success:false,
			message:'no token provided'
		})
	}
})
apiRoutes.get('/authenticate',(req,res)=>{
	User.findOne({id:req.decoded.id},(err,user)=>{
		if(err) throw err
		if(user){
			let {username,email,webSite,selfIro,phone,sex,collect,trends,likes,avatar}=user
			res.json({success:true,user:{username,email,webSite,selfIro,phone,sex,collect,trends,likes,avatar}})
		}else{
			res.json({success:false,message:'un recogenisze user'})
		}
	})
	
});
apiRoutes.get('/collect',(req,res)=>{
	User.findOne({id:req.decoded.id},(err,user)=>{
		if(err) throw err;
		if(user){
			res.json({success:true,message:'get collect',collect:user.collect})
		}else{
			res.json({success:false,message:`can't fint the collect of ${username}`})
		}
	})
});
apiRoutes.put('/collect',(req,res)=>{

	User.findOneAndUpdate({id:req.decoded.id},{$push:{collect:req.body.newcollect,trends:{date:new Date(),action:'收藏',id:req.body.newcollect.id,type:req.body.newcollect.type}}},(err,user)=>{
			if(err) throw err;
			res.json({success:true})
			
		})
	})
apiRoutes.delete('/collect/:id',(req,res)=>{
	User.update({id:req.decoded.id},{$pull:{collect:{id:req.params.id},trends:{id:req.params.id,action:'收藏'}}},(err,user)=>{
		if(err) throw err;
		
		res.json({success:true})

	})
})
apiRoutes.put('/like',(req,res)=>{

	User.findOneAndUpdate({id:req.decoded.id},{$push:{likes:req.body.like,trends:{date:new Date(),action:'赞',id:req.body.like.id,type:req.body.like.type}}},(err,user)=>{
			if(err) throw err;
			res.json({success:true})
			
		})
	})
apiRoutes.delete('/unlike/:id',(req,res)=>{
	User.update({id:req.decoded.id},{$pull:{likes:{id:req.params.id},trends:{id:req.params.id,action:'赞'}}},(err)=>{
		if(err) throw err;
		
		res.json({success:true})

	})
})
apiRoutes.get('/likes/:id',(req,res)=>{
	User.findOne({"id":req.decoded.id,"likes.id":req.params.id},(err,user)=>{
		if(err) throw err;
		
		if(user){
			res.json({success:true,islike:true})
		}else{
			res.json({success:false,islike:false})
		}
	})
});
apiRoutes.get('/trends',(req,res)=>{
	
	User.findOne({"id":req.decoded.id},(err,user)=>{
		if(err) throw err;
		if(user){
			res.json({success:true,trends:user.trends})
		}else{
			res.json({success:false,message:'wrong user'})
		}
	})
})
let storage=multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'./uploads')
	},
	filename:function(req,file,cb){
		cb(null,req.decoded.id+"avatar"+Date.now()+path.extname(file.originalname))
	}
});
let upload=multer({storage:storage,mimetype:'image/jpeg'}).single('avatar')
apiRoutes.post('/upload',(req,res)=>{
	upload(req,res,(err)=>{
		const fileTpyes=/jpg|jpeg|png|gif/
		
		if(req.file&&!fileTpyes.test(req.file.mimetype)){
			return  res.json({success:false,message:'修改头像失败,原因:只能接受图片'})

		}else if(!req.file){return  res.json({success:false,message:'修改头像失败,原因：未知'})}
		if(err){res.json({success:false,message:'修改头像失败,原因:上传失败'})}
		else{

			let avatar={
				path:'/uploads/'+req.file.filename,
				size:req.file.size
			}
			User.findOneAndUpdate({"id":req.decoded.id},{avatar:avatar},(err,user)=>{
				if(err){res.json({success:false,message:'修改头像失败,原因:获取用户失败'})}else{
					if(user.avatar.path!=='/uploads/user.jpg'){
						fs.unlink(path.dirname(__dirname)+user.avatar.path,(err)=>{console.log(err)})
					}
					
					res.json({success:true,avatar:avatar,message:'修改头像成功'})
				}
			})
		}
	})
	
})
apiRoutes.delete('/upload',(req,res)=>{
	let avatar={
		path:'/uploads/user.jpg'
	}
	User.findOneAndUpdate({"id":req.decoded.id},{avatar:avatar},(err,user)=>{
		if(err){
			res.json({success:false,message:'移除失败'})}
			else{
				if(user.avatar.path!=='/uploads/user.jpg'){
						fs.unlink(path.dirname(__dirname)+user.avatar.path,(err)=>{console.log(err)})
					}
			   res.json({success:true,avatar:avatar,message:'头像已移除'})
		}
	})
})
apiRoutes.post('/editProfile',(req,res)=>{
	if(req.body.oldPassword){
		let {oldPassword,newPassword,confirmPassword}=req.body

		if(newPassword.length<6||newPassword.length>16){
			return res.json({success:false,message:"密码长度应在6到16位"})
		}
		if(newPassword!=confirmPassword){
			return res.json({success:false,message:"密码不一致"})
		}
		User.findOne({id:req.decoded.id},(err,user)=>{
			if(err){return res.json({success:false,message:'未知错误'})}
			if(user){
				if(user.password!==oldPassword){return res.json({success:false,message:'请输入正确的旧密码'})}
				User.findOneAndUpdate({id:req.decoded.id},{password:newPassword},(err,user)=>{
					 if(err){return res.json({success:false,message:'未知错误'})}
					 return res.json({success:true,message:'修改密码成功'})
				})
			}
		})

	}else{
	let {email,username,selfIro,phone,webSite,sex}=req.body
	
	if(!/^[A-Za-z0-9\_]+@[a-zA-Z0-9]+.[a-zA-Z]+$/g.test(email)){
		if(!email){return res.json({success:false,message:'邮箱不能为空'})}
		return  res.json({success:false,message:'请输入正确的邮箱'})
	}
	if (!/^[A-Za-z0-9\_]{6,16}$/g.test(username)){
		if(!username){return res.json({success:false,message:'用户名不能为空'})}
		return res.json({success:false,message:(username.length>=6&&username.length<=16)?'用户名含有非法符号':"用户名长度应在6到16位之间"})
	}
	if(selfIro.length>150){
		return res.json({success:false,message:'个人简介应在150字以内'})
	}
	if(!/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/.test(webSite)&&webSite){
		return res.json({success:false,message:'错误的网站'})
	}
	if(phone){
		 let p=false;
		 for (let a of Object.keys(phones)){
			if(phones[a].test(phone)){p=true;break;}
		}
		if(!p){return res.json({success:false,message:'你的电话号码似乎不正确，请输入包括国家/地区代码的完整号码。'})}
	}
	User.findOne({email:email},(err,user)=>{
		if(err)return res.json({success:false,message:"未知错误"})
	
		if(user&&user.id!==req.decoded.id){
			 
			return res.json({success:false,message:"邮箱已存在"})
		}else{
			User.findOne({username:username},(err,user)=>{
				if(user&&user.id!==req.decoded.id){
				  return res.json({success:false,message:"用户名已存在"})
				}else{
					User.findOneAndUpdate({id:req.decoded.id},{email:email,username:username,phone:phone,sex:sex,selfIro:selfIro,webSite:webSite},(err,user)=>{
						if(err){return res.json({success:false,message:"未知错误"}) }
						
						return res.json({success:true,message:'个人资料已保存',user:{...req.body}})
					})
				}
			})
		}
		
	})
	
}})
export default apiRoutes;