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
    padding: 20,
    marginTop:64,
  },
  item: {
    fontSize: 30,
    fontWeight: '300',
    paddingTop: 5,
    backgroundColor :'white',
    paddingBottom: 5,
  },
});


var WatchlistButton = React.createClass({
  goToWatchlist(){
    const Watchlist = require ('./Watchlist');
    this.props.menuActions.close();
    
    this.props.navigator.push({
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
    const FilterPage = require ('./FilterPage');
    this.props.menuActions.close();
    this.props.navigator.push({
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
        <Text style={styles.item}>Filters</Text>
      </TouchableHighlight>
    );    
  }
});



var Menu = React.createClass({
  render() {
    return (
        <ScrollView style={styles.menu}>
          <WatchlistButton navigator={this.props.navigator} toggleNavBar={this.props.toggleNavBar} menuActions={this.props.menuActions}/>
          
          <FilterButton navigator={this.props.navigator} toggleNavBar={this.props.toggleNavBar} menuActions={this.props.menuActions}/>
        </ScrollView>
    );
  },
});


module.exports = Menu;