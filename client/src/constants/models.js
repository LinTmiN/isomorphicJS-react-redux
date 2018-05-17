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
	imageResult:[],
	videoResult:[],
	preSearchValue:'',
	page:'1',
    isSearching:false,
    key:[],
    resultsShow:false,
    isAdding:false,
    isInit:false,
})
export const InputState = Immutable.fromJS({
	email:'',
	password:'',
	avatar:'',
	username:'',
	searchtype:'video',
	searchvalue:'',

})