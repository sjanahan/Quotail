const React = require('react-native');
const Dimensions = require('Dimensions');
const {
  StyleSheet,
  ListView,
  ScrollView,
  View,
  Image,
  Text,
  Component,
  Navigator,
  TouchableHighlight,
} = React;

var GlobalConstants = require('../constants/GlobalConstants');
var {
  deviceScreen
} = GlobalConstants;


const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: deviceScreen.width,
    height: deviceScreen.height,
    backgroundColor: GlobalConstants.colors.gray_dark,
    paddingTop:66
  
  },
  menu_item:{
    borderColor:'#F2F2F2',
    borderBottomWidth:1,
  },
  item: {
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: '300',
    backgroundColor: GlobalConstants.colors.gray_dark,
    paddingTop:5,
    paddingBottom: 5,
    paddingLeft:10,
    color:GlobalConstants.colors.text_white,
  },
});


var AccountSettingsButton = React.createClass({
  goToAccountSettings(){
    console.log(this.props);
    console.log('Hi');

  },


  render(){
    return(
      <TouchableHighlight
      onPress={this.goToAccountSettings}>
      <View style={styles.menu_item}>
        <Text style={styles.item}>AccountSettings</Text>
      </View>
      </TouchableHighlight>
    );    
  }
});

var FilterButton = React.createClass({
  goToFilters(){
    const FilterPage = require ('./FilterPage');
    this.props.getNavigator().push({
      component: FilterPage,
      title: 'My Scans',
    });

  },

  render(){
    return(
      <TouchableHighlight
        onPress={this.goToFilters}>
        <View style={styles.menu_item}>
          <Text style={styles.item}>Scans</Text>
        </View>
      </TouchableHighlight>
    );    
  }
});

var LogoutButton = React.createClass({
  logout(){
    var AuthService = require('../services/AuthService');
    console.log(AuthService);
    AuthService.logout();
  },

  render(){
    return(
      <TouchableHighlight
        onPress={this.logout}>
        <View style={styles.menu_item}>
          <Text style={styles.item}>Log out</Text>
        </View>
      </TouchableHighlight>
    );    
  }
});

var CreditsButton=React.createClass({
  goToCredits(){
    const credits = require('./Credits');
    
    this.props.getNavigator().push({
      component: credits,
      title: 'Credits',
    });
  },
  render(){
    return(
      <TouchableHighlight
        onPress={this.goToCredits}>
        <View style={styles.menu_item}>
          <Text style={styles.item}>Credits</Text>
        </View>
      </TouchableHighlight>
    );  

  }
})



var Menu = React.createClass({
  render() {
    return (
        <ScrollView style={styles.menu}
        automaticallyAdjustContentInsets={false}>
          <FilterButton {...this.props}/>
          <CreditsButton {...this.props}/>
          <LogoutButton/>
        </ScrollView>
    );
  },
});

// wrapper that checks LoginStore for valid jwt before rendering
// also listens to changes on the store that conditionally render
var AuthenticatedWrapper = require('./AuthenticatedComponent');
module.exports = AuthenticatedWrapper(Menu);