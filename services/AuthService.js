var React = require('react-native');

var{
  AlertIOS
} = React;

var LoginConstants = require('../constants/LoginConstants');
var {
  LOGIN_URL,
  SIGNUP_URL
} = LoginConstants;

var querystring = require('querystring');
var LoginActions = require ('../actions/LoginAction');
var Home = require('../Home');
var Q = require('q');

var LocalStorage = require('../stores/LocalStorage');

var LoginStore = require('../stores/LoginStore');


class AuthService {
  login(email, password) {
    console.log(email);
    console.log(password);
    var login = querystring.stringify({
                'email': email,
                'password': password
            });
  
    var Obj = {
      method:'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:login,
    }

    return this.handleAuth(fetch(LOGIN_URL, Obj));
  }

  logout() {
    LoginActions.logoutUser();
  }

  forgotPassword(){
    LoginActions.forgotPassword();
  }

  signUp(){
    LoginActions.signUp();
  }

  signup(username, password, extra) {
    return this.handleAuth(when(fetch({
      url: SIGNUP_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        username, password, extra
      }
    })));
  }

  handleAuth(loginPromise) {
    return loginPromise.then(function(response) {
        response.json().then(function(jsoned){
        if (jsoned.token){
          var jwt = jsoned.token;
          LoginActions.loginUser(jwt);
        }else{
          AlertIOS.alert(jsoned.message);
          console.log(jsoned.message);
          return false;
        }
      })
    });
  }

  isLoggedIn(){
    var context = this;
    var deferred = Q.defer();
    LocalStorage.get('jwt', 'string').then(function(jwt){
      if (jwt != null){
        LoginStore.set_jwt(jwt);
        console.log("jwt is not null");
        deferred.resolve(true);
      }else{
        console.log("no jwt for you, asshat");
        deferred.resolve(false);
      }
    });

    return deferred.promise;
  }

  get_jwt(){
    return this._jwt;
  }

  is_logged_in(){
    return (this._jwt != null);
  }
}

module.exports = new AuthService();