var LoginConstants = require('../constants/LoginConstants');
var {
  LOGIN_URL,
  SIGNUP_URL
} = LoginConstants;

var querystring = require('querystring');
var LoginActions = require ('../LoginAction');
var Home = require('../Home');
var Q = require('q');

var LocalStorage = require('../stores/LocalStorage');


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

          // Transition to Home
          //return <Home/>;
          LocalStorage.set("jwt", jwt).then(function(){
            console.log('WORD')
            return true;
          });
        }else{
          // maybe alert on this?
          console.log(jsoned.message);
          return false;
        }
      })
    });
  }

  isLoggedIn(){
    var deferred = Q.defer();
    LocalStorage.get('jwt', 'string').then(function(jwt){
      console.log(jwt);
      if (jwt != null){
        console.log("jwt is not null");
        deferred.resolve(true);
      }else{
        console.log("no jwt for you, asshat");
        deferred.resolve(false);
      }
    });

    return deferred.promise;
  }
}

module.exports = new AuthService();