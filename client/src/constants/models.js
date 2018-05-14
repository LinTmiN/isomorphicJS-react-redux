import Immutable from 'immutable';

export const UserState=Immutable.fromJS({
    userInfo:{},
	collect:[],
	isAuthorized:false,
	isLoging:false,
	isRegister:false,
	switchType:'login'
});
export const SearchState = Immutable.fromJS({
	result:[],
	history:[],
	page:'',
	resultcount:'',
    issearching:false,
    key:[],
    resultsShow:false
})
export const InputState = Immutable.fromJS({
	email:'',
	password:'',
	avatar:'',
	username:'',
	searchtype:'',
	searchvalue:'',

})