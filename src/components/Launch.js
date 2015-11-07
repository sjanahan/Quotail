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

/*var settings_uri = 'http://cdn.flaticon.com/png/256/70443.png';
var msg_uri = 'http://cdn.flaticon.com/png/256/98.png';*/
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
      //console.log('callback');
      //console.log("Component did Mount");
      context.setState({
        isLoggedIn: bool
      });
      //console.log('after setState')
    });
  },

  render(){
    var fs;// = <NavBar/>;
    //console.log(this.state.isLoggedIn);
    if (this.state.isLoggedIn === true){
      fs = <NavBar/>;
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
  app: { 
    width: deviceScreen.width, 
    height: deviceScreen.height 
  }
})

module.exports = Launch;