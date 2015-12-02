var React = require('react-native');
var {
  Component,
  View,
  StyleSheet,
} = React;

// Global colors and screen size
var GlobalConstants = require('../constants/GlobalConstants');
var {
  deviceScreen
} = GlobalConstants;

// Components
var Login = require('./Login');
var NavBar = require('./NavBar');
var Loading = require ('./Loading');



var LocalStorage = require('../stores/LocalStorage');
var AuthService = require('../services/AuthService');
var LoginStore = require('../stores/LoginStore');

var Launch = React.createClass({
  getInitialState(){
    return {
      isLoggedIn:null
    };  
  },

  componentDidMount(){
    var context = this;
    AuthService.isLoggedIn().then(function(bool){
      context.setState({
        isLoggedIn: bool
      });
    });
  },

  render(){
    var fs;
    if (this.state.isLoggedIn == null){
      fs = <Loading/>;
    }
    else if (this.state.isLoggedIn === true){
      fs = <NavBar/>;
    }else if (this.state.isLoggedIn === false){
      fs = <Login/>;
    }

    return (
      <View style={ styles.app }>
        {fs}
      </View>)
  }

});

var styles = StyleSheet.create({
  app: { 
    width: deviceScreen.width, 
    height: deviceScreen.height 
  }
})

module.exports = Launch;