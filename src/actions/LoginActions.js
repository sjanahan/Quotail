var LocalStorage = require('../stores/LocalStorage');
var RNFXActions = require('react-native-router-flux').Actions;
var alt = require('../alt');


class LoginActions{
  constructor(){
    console.log("instantiating the loginactions");
  }

  loginUser(jwt){
    //this.dispatch(jwt);
    // Go to the NavBar once the user is logged in
    //console.log(Actions.navBar);
    console.log("logging in...");
    
    this.dispatch(jwt);

    // save JWT in LocalStorage
    LocalStorage.set("jwt", jwt).then(function(){
      console.log('set into LocalStorage');
      //this.dispatch(jwt);
      RNFXActions.navBar();
      //return jwt;
      //return this.dispatch(jwt);
      //return true;
    });

    console.log(this);

    // Send the action to all stores through the Dispatcher
    /*AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      jwt: jwt
    });*/
  }

  forgotPassword(){
    console.log("forgot password");
    RNFXActions.forgot();
  }

  signUp(){
    console.log("sign up screen");
    RNFXActions.signup();
  }

  logout(){
    console.log('logging out...');
    //console.log(this.dispatch);
    this.dispatch(1);
    LocalStorage.remove("jwt").then(function(){
      console.log('removing jwt from LocalStorage');
    });
  }
}

module.exports = alt.createActions(LoginActions);