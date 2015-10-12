// LoginAction.js

var LocalStorage = require('./stores/LocalStorage');
var Home = require('./Home');
var RouterContainer = require('./services/RouterContainer');
var RNRouter

class LoginAction{
  loginUser(jwt){
    // Go to the Home page once the user is logged in
    RouterContainer.get();
    // We save the JWT in localStorage to keep the user authenticated. We’ll learn more about this later.
    console.log("we logging in ");
    LocalStorage.remove("jwt").then(function(){
      console.log('removing')
      return true;
    });

    LocalStorage.set("jwt", jwt).then(function(){
      console.log('WORD')
      return true;
    });
    // Send the action to all stores through the Dispatcher
    /*AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      jwt: jwt
    });*/
  }
}

module.exports = new LoginAction();