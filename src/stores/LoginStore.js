var LoginConstants = require( '../constants/LoginConstants');

var 
{LOGIN_USER, LOGOUT_USER} = LoginConstants;

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
    console.log("instantiating the store");
    console.log(LoginActions);
    console.log(alt);
    this.bindListeners({
      _onLoginUser:LoginActions.LOGIN_USER,
      _onLogoutUser:LoginActions.LOGOUT
    });

    console.log(this);
    /*this.bindAction(LoginActions.LOGIN_USER, this.onLoginUser);
    this.bindAction(LoginActions.LOGOUT, this.onLogoutUser);*/

    this._user = null;
    this._jwt = null;

    alt.addStore("LoginStore", this);
    
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
    return !!this._user;
  }
}

module.exports = alt.createStore(LoginStore, 'LoginStore');