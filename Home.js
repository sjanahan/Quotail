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

var SideMenu = require('react-native-side-menu');
var Menu = require('./Menu');
var MainScreen = require('./MainScreen');
var LoginStore = require('./stores/LoginStore');

var FirstAuthenticatedScreen = React.createClass({
  printLeft(){
    console.log("print left");
  },

  printRight(){
    console.log("printRight");
  },

  goToWatchlist(){
    var Watchlist = require ('./Watchlist');
    this.refs.sidemenu.closeMenu();
    
    this.refs.nav.push({
      component: Watchlist,
      title: 'My Watchlist',
      passProps:{
        menuActions: this.props.menuActions,
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
	      <SideMenu ref="sidemenu" touchToClose={true} disableGestures={true} menu={<Menu getNavigator={this.getNavigator}/>}>
	        	<NavigatorIOS
	            ref = "nav"
	        	shouldUpdate={true}
	        	style={styles.container}
	            barTintColor='#00a4b5'
	            tintColor='white'
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
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = FirstAuthenticatedScreen;