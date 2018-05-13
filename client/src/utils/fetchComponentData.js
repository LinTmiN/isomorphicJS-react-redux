import axios from 'axios';
export default function fetchComponentData(token='token'){
	const promise =axios.get('http://localhost:3001/api/authenticate?token='+token);
	return promise
}