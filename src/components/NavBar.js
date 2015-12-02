var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Component,
  NavigatorIOS,
  Navigator,
  Image,
} = React;

// components
var SideMenu = require('react-native-side-menu');
var Menu = require('./Menu');
var MainScreen = require('./MainScreen');
var GlobalConstants = require('../constants/GlobalConstants');


// wrapper that checks LoginStore for valid jwt before rendering
// also listens to changes on the store that conditionally render
var AuthenticatedWrapper = require('./AuthenticatedComponent');

var DataService = require('../services/DataService');
var TimerMixin = require('react-timer-mixin');

var NavBar = React.createClass({
  mixins: [TimerMixin],
  getInitialState(){
    return {
      watchlist: null,
      timeoutDone:false,
    }
  },

  componentDidMount(){
    var context = this;
    DataService.getWatchlist().then(function(watchlist_from_backend){
      context.setState({
        watchlist: watchlist_from_backend,
      });
    });   
  },

  goToWatchlist(){
    var Watchlist = require ('./Watchlist');
    //this.refs.sidemenu.closeMenu();
    
    this.refs.nav.navigator.push({
      component: Watchlist,
      title: 'My Watchlist',
      passProps:{
        menuActions: this.props.menuActions,
        navigator: this.refs.nav.navigator,
        watchlist: this.state.watchlist,
      }, 
    });
  },

  showSideBar () {
    console.log(this.context);
    console.log(SideMenu);
    this.refs.sidemenu.openMenu();
    //this.context.menuActions.open();
    /*this.refs.nav.navigator.push({
      component:SideMenu,
      title:"SIDEMNU",
      navigator: this.refs.nav.navigator,
    })*/
  },

  getNavigator(){
    if (this.refs.nav){
      return this.refs.nav.navigator;
    }else{
      return undefined;
    }
  },

  /*
  <SideMenu ref="sidemenu" isOpen={false} touchToClose={true} disableGestures={true} menu={<Menu getNavigator={this.getNavigator}/>}>
     </SideMenu>*/
	
	render(){
    return (
      <SideMenu ref="sidemenu" isOpen={false} touchToClose={true} disableGestures={true} menu={<Menu getNavigator={this.getNavigator}/>}>
        <NavigatorIOS
          ref = "nav"
          style={styles.container}
          barTintColor={'#151B20'}
          tintColor={'white'}
          titleTextColor={'white'}
          shouldUpdate={true}
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
})
;


module.exports = NavBar;