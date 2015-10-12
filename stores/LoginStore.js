var LoginConstants = require( '../constants/LoginConstants');

var 
{LOGIN_USER, LOGOUT_USER} = LoginConstants;



var LocalStorage = require('./LocalStorage');
var jwt_decode = require( 'jwt-decode');


class LoginStore extends LocalStorage{

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._user = null;
    this._jwt = null;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case LOGIN_USER:
        this._jwt = action.jwt;
        this._user = jwt_decode(this._jwt);
        this.emitChange();
        break;
      case LOGOUT_USER:
        this._user = null;
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get user() {
    return this._user;
  }

  get jwt() {
    return this._jwt;
  }

  isLoggedIn() {
    return !!this._user;
  }
}

module.exports = new LoginStore();