var React = require('react-native');
var {
  Component,
  View,
} = React;

var connectToStores = require('alt/utils/connectToStores');
var AltNativeContainer = require('/alt/AltNativeContainer');
var LoginStore = require('../stores/LoginStore');
var LoginActions = require('../actions/LoginActions');
var {Actions} = require('react-native-router-flux');

var AuthenticatedWrapper = function(ComposedComponent){
  class AuthenticatedComponent extends React.Component {


    // Here, we’re subscribing to changes in the LoginStore we created before. 
    // Remember that the LoginStore is an EventEmmiter.
    componentWillMount() {
      //console.log(this);
      console.log("checking auth");
      /*This method is called before transitioning to this component. 
      If the user is not logged in, we’ll send him or her to the Login page.*/
      if (!LoginStore.isLoggedIn()) {
        LoginActions.logout();
      }else{
        console.log(LoginStore.get_jwt())
      }
    }

    static getStores(){
      return[LoginStore];
    }

    static getPropsFromStores(){
      return LoginStore.getState();
    }


    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  return connectToStores(AuthenticatedComponent);
};


module.exports = AuthenticatedWrapper;