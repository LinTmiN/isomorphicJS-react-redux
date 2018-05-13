import Express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import config from './config';
import apiRoutes from './Api/api.js';
import morgan from 'morgan';
console.log(process.env.NODE_ENV)
const app = new Express();
const port = process.env.PORT || 5000;
mongoose.connect(config.database);
app.set('env','production');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api',apiRoutes);
app.listen(port,(error)=>{
	if(error){
		console.log(error)
	}else{
		console.log(`==>🌎Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
		}
})