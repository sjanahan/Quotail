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
} = React;

var MainScreen = require('./MainScreen');



var AwesomeProject = React.createClass({
  render: function() {

    return (
		<MainScreen/>
       
    );
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);