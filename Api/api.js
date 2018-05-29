import Express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config';
import uuid from 'uuid/v1'
const app = new Express();
const apiRoutes = Express.Router();
app.set('superSecrect',config.secrect);

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
	 			res.json({success:true,message:'login success',token:token,user:{username:user.username,emaiL:user.email,avatar:user.avatar},collect:user.collect})
	 		}
	 	}
	})
});
apiRoutes.get('/test',(req,res)=>{
	User.findOneAndUpdate({username:'laaa'},{$push:{collect:{id:'123','type':'image'}}},(err,user)=>{
			if(err) throw err;
			res.json({success:true,user:user})
			})
})
apiRoutes.get('/setup',(req,res)=>{
   const sampleUser=new User({
   	   username:'laaa',
   	   email:'123456@126.com',
   	   password:'123456',
   	   avatar:'',
   	   collect:[{'id':'123456',type:'image'},{'id':'87',type:'image'},{'id':'520',type:'image'}]
   })
   sampleUser.save((err)=>{
   	 if(err) throw err;
   	 
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
          	  	    avatar:req.body.avatar||'http://img3.imgtn.bdimg.com/it/u=3150822554,1701663780&fm=27&gp=0.jpg'
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
	User.findOne({email:req.decoded.email},(err,user)=>{
		if(err) throw err
		if(user){
			
			res.json({success:true,user:{email:user.email,username:user.username,avatar:user.avatar,collect:user.collect}})
		}else{
			res.json({success:false,message:'un recogenisze user'})
		}
	})
	
});
apiRoutes.get('/collect',(req,res)=>{
	User.findOne({email:req.decoded.email},(err,user)=>{
		if(err) throw err;
		if(user){
			res.json({success:true,message:'get collect',collect:user.collect})
		}else{
			res.json({success:false,message:`can't fint the collect of ${username}`})
		}
	})
});
apiRoutes.put('/collect',(req,res)=>{

	User.findOneAndUpdate({email:req.decoded.email},{$push:{collect:req.body.newcollect,trends:{date:new Date(),action:'收藏',id:req.body.newcollect.id,type:req.body.newcollect.type}}},(err,user)=>{
			if(err) throw err;
			res.json({success:true})
			
		})
	})
apiRoutes.delete('/collect/:id',(req,res)=>{
	User.update({email:req.decoded.email},{$pull:{collect:{id:req.params.id},trends:{id:req.params.id}}},(err,user)=>{
		if(err) throw err;
		
		res.json({success:true})

	})
})
apiRoutes.put('/like',(req,res)=>{

	User.findOneAndUpdate({email:req.decoded.email},{$push:{likes:req.body.like,trends:{date:new Date(),action:'赞',id:req.body.like.id,type:req.body.like.type}}},(err,user)=>{
			if(err) throw err;
			res.json({success:true})
			
		})
	})
apiRoutes.delete('/unlike/:id',(req,res)=>{
	User.update({email:req.decoded.email},{$pull:{likes:{id:req.params.id},trends:{id:req.params.id}}},(err)=>{
		if(err) throw err;
		
		res.json({success:true})

	})
})
apiRoutes.get('/likes/:id',(req,res)=>{
	User.findOne({"email":req.decoded.email,"likes.id":req.params.id},(err,user)=>{
		if(err) throw err;
		console.log(user)
		if(user){
			res.json({success:true,islike:true})
		}else{
			res.json({success:false,islike:false})
		}
	})
});
export default apiRoutes;