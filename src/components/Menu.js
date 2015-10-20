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
    backgroundColor: '#E6E6E6',
    paddingTop:deviceScreen.height*.067,
  },
  menu_item:{
    borderColor:'black',
    borderBottomWidth:1,
  },
  item: {
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: '300',
    paddingTop: 5,
    backgroundColor :'white',
    paddingBottom: 5,
    paddingLeft:10,
  },
});


var AccountSettingsButton = React.createClass({
  goToAccountSettings(){
    console.log('this is where account settings go');

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
      title: 'My Filters',
    });

  },

  render(){
    return(
      <TouchableHighlight
        onPress={this.goToFilters}>
        <View style={styles.menu_item}>
          <Text style={styles.item}>Filters</Text>
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



var Menu = React.createClass({
  render() {
    return (
        <ScrollView style={styles.menu}>
          <AccountSettingsButton/>
          <FilterButton getNavigator={this.props.getNavigator}/>
          <LogoutButton/>
        </ScrollView>
    );
  },
});

module.exports = Menu;