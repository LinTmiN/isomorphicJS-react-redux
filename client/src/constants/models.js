import Immutable from 'immutable';

export const UserState=Immutable.fromJS({
    userInfo:{},
	collect:[],
	isAuthorized:false,
	isLoging:false,
	isRegister:false,
	isCheck:true,
	switchType:'login',
	loginError:''
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
    isCardInit:false,
})
export const InputState = Immutable.fromJS({
	email:'',
	password:'',
	avatar:undefined,
	username:'',
	searchtype:'video',
	searchvalue:'',
	screen:{width:document.body.clientWidth,height:document.body.clientHeight},
	total:'',
	scrollTop:window.scrollY
})