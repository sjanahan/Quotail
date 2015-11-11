var React = require('react-native');
var{
  AlertIOS
} = React;

var GlobalConstants = require('../constants/GlobalConstants');
var LoginConstants = require('../constants/LoginConstants');

var {
  LOGIN_URL,
  FORGOT_PASSWORD_URL,
  REGISTER_URL,
} = LoginConstants;

var {Actions} = require('react-native-router-flux');
var LoginActions = require ('../actions/LoginActions');
var Q = require('q');
var querystring = require('querystring'); // for stringify'ing bodies

var LocalStorage = require('../stores/LocalStorage');
var LoginStore = require('../stores/LoginStore');
var ServiceUtils = require('./ServiceUtils');

var AuthService = function(){
  var self = this;
  self.doRequest = function(body, type, url){

  }
  self.login = function(email, password) {
    //console.log(email);
    //console.log(password);
    var body = querystring.stringify({
                'email': email,
                'password': password
            });
  
    var Obj = {
      method:'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:body,
    }

    console.log('logging in function');

    return self.handleAuth(fetch(LOGIN_URL, Obj));
  }

  self.resetPassword = function(email){
    var body = querystring.stringify({
                'email': email,
            });
  
    var Obj = {
      method:'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:body,
    }
    
    fetch(FORGOT_PASSWORD_URL, Obj)
      .then(ServiceUtils.checkStatus)
      .then(ServiceUtils.parseJSON)
      .then(function(json_res){
        //console.log(json_res);
        AlertIOS.alert(json_res.message + '\n' + email);
        Actions.login();
      }).catch(function(error){
        //console.log(error);
        AlertIOS.alert(error.toString());
      })
  }

  self.logout = function() {
    /*LocalStorage.remove("jwt").then(function(){
      console.log('removing')
    });*/
    LoginActions.logout();
  }

  self.forgotPassword = function(){
    LoginActions.forgotPassword();
  }

  self.register = function(firstname, lastname, email,
           password, confirm_password){
    //console.log(password);
    //console.log(confirm_password);
    if (password !== confirm_password){
      AlertIOS.alert("Passwords do not match!");
      return;
    }
    
    var body = querystring.stringify({
                'firstName': firstname,
                'lastName': lastname,
                'email': email,
                'password': password
    });

    var Obj = {
      method:'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:body,
    }

    //console.log(this);
    fetch(REGISTER_URL, Obj)      
      .then(ServiceUtils.checkStatus)
      .then(ServiceUtils.parseJSON)
      .then(function(json_res){
        self.login(email, password);
      })
      .catch(function(error){
        console.log(error);
        AlertIOS.alert(error.toString());
      })
    }

  self.handleAuth = function(loginPromise) {
    return loginPromise.then(function(response) {
      console.log(response);
        response.json().then(function(jsoned){
        if (jsoned.token){
          console.log(jsoned.token);
          var jwt = jsoned.token;
          LoginActions.loginUser(jwt);
        }else{
          AlertIOS.alert(jsoned.message);
          console.log(jsoned.message);
          return false;
        }
      })
    }).catch(function(error){
        console.log(error);
        AlertIOS.alert(error.toString());
    });
  }

  self.isLoggedIn = function(){
    //var context = this;
    var deferred = Q.defer();
    LocalStorage.get('jwt', 'string').then(function(jwt){
      //console.log(jwt);
      if (jwt != null){
        //LoginStore.set_jwt(jwt);
        LoginActions.loginUser(jwt);
        //console.log("jwt is not null");
        deferred.resolve(true);
      }else{
        //console.log("no jwt for you, asshat");
        deferred.resolve(false);
      }
    });

    return deferred.promise;
  }
}

module.exports = new AuthService();