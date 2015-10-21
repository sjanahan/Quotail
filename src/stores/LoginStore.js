var LoginConstants = require( '../constants/LoginConstants');

var 
{LOGIN_USER, LOGOUT_USER} = LoginConstants;

var BaseStore = require('./BaseStore');

// holds the data it gets from actions
// inherits from eventemmiter, it should emit a change
// event every time its data changes so components
// can re-render

var LocalStorage = require('./LocalStorage');
var LoginActions = require('../actions/LoginActions');
var jwt_decode = require( 'jwt-decode');
var alt = require('../alt');

class LoginStore{
  constructor() {
    console.log("instantiating the loginsTore");
    
    //super();
    this.bindListeners({
      _onLoginUser:LoginActions.LOGIN_USER,
      _onLogoutUser:LoginActions.LOGOUT
    });

    this._user = null;
    this._jwt = null;

    this.exportPublicMethods({
      get_user: ()=> {return this._user;},
      get_jwt: ()=> {return this._jwt;},
      isLoggedIn: ()=> {return !!this._user;},
    });

  }

  _onLoginUser(jwt){
    console.log('Store onLoginUser');
    this._jwt = jwt;
    this._user = jwt_decode(jwt);
  }
  

  _onLogoutUser(integer){
    console.log('Store onLogoutUser' + integer.toString());
    this._jwt = null;
    this._user = null;
  }

  get_user() {
    return this._user;
  }

  get_jwt() {
    return this._jwt;
  }

  isLoggedIn() {
    return this._user!=undefined && this._jwt!=undefined;
  }


}

module.exports = alt.createStore(LoginStore, 'LoginStore');
//module.exports = new LoginStore();