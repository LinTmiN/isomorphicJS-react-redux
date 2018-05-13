import Immutable from 'immutable';

export const UserState=Immutable.fromJS({
    userInfo:{},
	collect:[],
	isAuthorized:false,
	isLoging:false,
	isRegister:false,
});
export const SearchState = Immutable.fromJS({
	result:[],
	type:'',//video||image
	history:[],
	value:'',
	resultpage:'',
	resultcount:'',
    issearching:false,
})
export const InputState = Immutable.fromJS({
	email:'',
	password:'',
	avatar:'',
	username:'',
	searchtype:'',
	searchvalue:'',
})