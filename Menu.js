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

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#E6E6E6',
    paddingTop:window.height*.067,
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


var WatchlistButton = React.createClass({
  goToWatchlist(){
    const Watchlist = require ('./Watchlist');
    this.props.menuActions.close();
    
    this.props.getNavigator().push({
      component: Watchlist,
      title: 'My Watchlist',
      passProps:{
        menuActions: this.props.menuActions,
        toggleNavBar: this.props.toggleNavBar,
      }, 
    });

  },

  render(){
    return(
      <TouchableHighlight
      onPress={this.goToWatchlist}>
        <Text style={styles.item}>Watchlist</Text>
      </TouchableHighlight>
    );    
  }
});

var FilterButton = React.createClass({
  goToFilters(){
    console.log(this.props);
    const FilterPage = require ('./FilterPage');
    //this.props.menuActions.close();
    this.props.getNavigator().push({
      component: FilterPage,
      title: 'My Filters',
      passProps:{
        menuActions: this.props.menuActions,
        toggleNavBar: this.props.toggleNavBar,
      }
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



var Menu = React.createClass({

  render() {
    //console.log(this.props.getNavigator());
    return (
        <ScrollView style={styles.menu}>
          <FilterButton getNavigator={this.props.getNavigator} menuActions={this.props.menuActions}/>
        </ScrollView>
    );
  },
});


module.exports = Menu;