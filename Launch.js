/**
 * Sample React Native App
 * https://github.com/facebook/react-

 @flow
 */

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Component,
  NavigatorIOS,
  Image,
  AlertIOS,
  Navigator,
} = React;


var global_styles = require('./Styles');
var LocalStorage = require('./stores/LocalStorage');

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var Login = require('./Login');
var Home = require('./Home');
var Filters = require('./FilterPage');
var MessageView = require('./MessageView');
var Watchlist = require('./Watchlist');
var Menu = require('./Menu');
var Loading = require ('./Loading');
var SignUp = require('./SignUp');
var ForgotPassword = require('./ForgotPassword');

var AuthService = require('./services/AuthService');

var settings_uri = 'http://cdn.flaticon.com/png/256/70443.png';
var msg_uri = 'http://cdn.flaticon.com/png/256/98.png';
var {Router, Route, Container, Actions, Animations, Schema} = require('react-native-router-flux');

var Launch = React.createClass({
  getInitialState(){
    return {
      isLoggedIn:null
    };  
  },

  componentWillMount(){
    var context = this;
    LocalStorage.remove("jwt").then(function(){
      console.log('removing')
    });
    AuthService.isLoggedIn().then(function(bool){
      console.log('callback');
      console.log("Component did Mount");
      context.setState({
        isLoggedIn: bool
      });
      console.log('after setState')
    });
  },

  render(){
    var fs;
    console.log(this.state.isLoggedIn);
    if (this.state.isLoggedIn === true){
      fs = <Home/>;
    }else if (this.state.isLoggedIn === false){
      fs = <Login/>;
    }else{
      fs = <Loading/>;
    }

    return (
      <View style={ styles.app }>
        {fs}
      </View>)
  }

});

var styles = StyleSheet.create({
  app: { width, height },
})

module.exports = Launch;