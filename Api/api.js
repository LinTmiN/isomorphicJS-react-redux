import Express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config';
import uuid from 'uuid/v1'
const app = new Express();
const apiRoutes = Express.Router();
app.set('superSecrect',config.secrect);
console.log(app.get('superSecrect'))
apiRoutes.post('/login',function(req,res){
	User.findOne({
		email:req.body.email
	},(err,user)=>{
	 	if(err) throw err;
	 	if(!user){
	 		res.json({success: false,message:'Authentication failed. User not found.'})
	 	}else if(user){
	 		if(user.password!=req.body.password){
	 			res.json({success: false,message:'Authentication failed. Wrong password'})
	 		}else{
	 			const token=jwt.sign({email:user.email,username:user.username},'abc',{
	 				expiresIn:60*60*24
	 			})
	 			res.json({success:true,message:'login success',token:token,user:{username:user.username,emaiL:user.email,avatar:user.avatar}})
	 		}
	 	}
	})
});
apiRoutes.get('/setup',(req,res)=>{
   const sampleUser=new User({
   	   username:'laaa',
   	   email:'123456@126.com',
   	   password:'123456',
   	   avatar:'wwwww'
   })
   sampleUser.save((err)=>{
   	 if(err) throw err;
   	 console.log('setup success')
   	 res.json({success:true,message:'init'})
   })
});
apiRoutes.post('/register',function(req,res){
    User.findOne({
    	email:req.body.email
    },(err,user)=>{
          if(err) throw err;
          if(user){
          	res.json({sucess:false,message:'email was used'})
          }else if(!user){
          	  const newUser=new User({
          	  	    username:req.body.username,
          	  	    email:req.body.email,
          	  	    password:req.body.password,
          	  	    avatar:req.body.avatar
          	  });
          	  newUser.save((err)=>{
          	  	if(err) throw err;
          	  	res.json({sucess:true,message:'register success ',user:{
          	  		 email:req.body.email,
          	  	    password:req.body.password
          	  	}})

          	  })
          }
    })
})
apiRoutes.use((req,res,next)=>{
	var token = req.body.token || req.query.token ||req.headers['x-access-token'];
	if(token){
		jwt.verify(token,'abc',(err,decoded)=>{
			if(err){
				return res.json({success:false,message:'Failed to authenticate token'})
			}else{
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
	res.json({success:true,message:'verify token success'})
});
apiRoutes.get('/collect/:username',(req,res)=>{
	User.findOne({username:req.params.username},(err,user)=>{
		if(err) throw err;
		if(user){
			res.json({success:true,message:'get collect',collect:user.collect})
		}else{
			res.json({success:false,message:`can't fint the collect of ${username}`})
		}
	})
});
apiRoutes.put('/collect/:username',(req,res)=>{
	User.update({username:req.params.username},{$push:{collect:req.body.collect}},(err)=>{
		if(err) throw err;
		res.json({success:true})
	})

});
apiRoutes.delete('/collect/:username',(req,res)=>{
	User.update({username:req.params.username},{$pull:{collect:{id:req.body.id}}},(err)=>{
		if(err) throw err;
		res.json({success:true})
	})
})
export default apiRoutes;