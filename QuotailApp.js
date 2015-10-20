var React = require('react-native');
var {
  AppRegistry,
  Component,
} = React;

// components outside logged in workflow
var Launch = require('./src/components/Launch');
var Login = require('./src/components/Login');
var ForgotPassword = require('./src/components/ForgotPassword');
var SignUp = require('./src/components/SignUp');
var SetPassword = require('./src/components/SetPassword');
var {Router, Route, Actions} = require('react-native-router-flux');

// first authenticated route
var NavBar = require('./src/components/NavBar');


var QuotailApp = React.createClass({
  /* defining routes 
    1. navBar
    2. routes that are not children of the nav bar (all kind of prelogin stuff) */
  render(){
    return(
      <Router>
        <Route name="launch" component={ Launch } initial={true}/>
        <Route name="navBar" component={ NavBar }/>
        <Route name="login" component={ Login }/>
        <Route name="forgot" component={ ForgotPassword }/>
        <Route name="signup" component={ SignUp }/>
        <Route name="setPassword" component={ SetPassword }/>
      </Router>
    );
  }

});

AppRegistry.registerComponent('AwesomeProject', () => QuotailApp);