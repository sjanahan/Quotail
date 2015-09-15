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
  Image,
  AlertIOS,
} = React;


var MainScreen = require('./MainScreen');

var settings_uri = 'http://cdn.flaticon.com/png/256/70443.png';
var msg_uri = 'http://cdn.flaticon.com/png/256/98.png';

var SideMenu = require('react-native-side-menu');
var Menu = require('./Menu');

/*var SettingsMenu = React.createClass({
  render(){
    return(

    );
  }
})*/

var MessageButton = React.createClass({
  render(){
    <Image source={{uri:msg_uri}}/>
  }
});

var SettingsButton = React.createClass({
  render(){
    <Image source={{uri:settings_uri}}/>
  }
});

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
    console.log(this.state.navigationBarHidden);
  },

  printLeft(){
    console.log("print left");
  },

  printRight(){
    console.log("printRight");
  },

  goToWatchlist(){
    var Watchlist = require ('./Watchlist');
    this.refs.sidemenu.closeMenu();
    //console.log(this.refs.mainscreen.route);
    
    this.refs.nav.push({
      component: Watchlist,
      title: 'My Watchlist',
      passProps:{
        menuActions: this.props.menuActions,
        toggleNavBar: this.props.toggleNavBar,
      }, 
    });
  },

  showSideBar () {
    this.refs.sidemenu.openMenu();
  },

  getNavigator(){
    if (this.refs.nav){
      return this.refs.nav.navigator;
    }else{
      return undefined;
    }
  },

  render(){
    return (
      <SideMenu ref="sidemenu" touchToClose={true} disableGestures={true} menu={<Menu getNavigator={this.getNavigator} menuActions={this.props.menuActions}/>}>
        	<NavigatorIOS
            ref = "nav"
        		shouldUpdate={true}
        		style={styles.container}
            barTintColor='#00a4b5'
            tintColor='black'
            titleTextColor='white'
        		initialRoute={{
        			component: MainScreen,
        			title:'Quotail',
              leftButtonIcon: require('image!settings'),
              onLeftButtonPress: ()=> {this.showSideBar(); },
              rightButtonIcon: require('image!binoculars'),
              onRightButtonPress: ()=> {this.goToWatchlist(); },
            }}
        	  />
        </SideMenu>

        
    );
       
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);