// LoginAction.js

var LocalStorage = require('../stores/LocalStorage');
var Home = require('../Home');
var RouterContainer = require('../services/RouterContainer');
var {Actions} = require('react-native-router-flux');

var LoginStore = require('../stores/LoginStore');


class LoginAction{
  loginUser(jwt){
    // Go to the Home page once the user is logged in
    Actions.home();


    // save JWT in LocalStorage
    LocalStorage.set("jwt", jwt).then(function(){
      console.log('WORD')
      return true;
    });

    LoginStore.set_jwt(jwt);
    // Send the action to all stores through the Dispatcher
    /*AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      jwt: jwt
    });*/
  }

  forgotPassword(){
    Actions.forgot();
  }

  signUp(){
    Actions.signup();
  }

  register(){
    Actions.registered();
  }


}

module.exports = new LoginAction();