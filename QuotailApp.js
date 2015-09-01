/**
 * Sample React Native App
 * https://github.com/facebook/react-

 @flow
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Component,
  NavigatorIOS,
} = React;

var MainScreen = require('./MainScreen');



var AwesomeProject = React.createClass({
  getInitialState() {
    return {
      navigationBarHidden: false
    };
  },

  componentDidUpdate(prevProps, prevState){
  	console.log("QuotailApp updating");
  },

  toggleNavBar() {
  	console.log("Toggling nav bar");
    /*this.setState({
      navigationBarHidden: !this.state.navigationBarHidden
    });*/
    console.log(this.state.navigationBarHidden);
  },

  render(){

    return (
    	<NavigatorIOS
    		shouldUpdate={true}
    		style={styles.container}
    		navigationBarHidden={this.state.navigationBarHidden} 
    		initialRoute={{
    			component: MainScreen,
    			passProps: { toggleNavBar: this.toggleNavBar},
    			title:'Quotail Discovery'
    		}}
    		
    	/>
    );
       
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);