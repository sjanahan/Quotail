var React = require('react-native');


var {
	View,
	Component,
	Text,
	StyleSheet,
	Dimensions,
} = React;

const deviceScreen = Dimensions.get('window');

var Watchlist = React.createClass({
	componentDidMount(){
		console.log("componentDidMount");
		this.props.menuActions.close();

	},

	componentWillUnmount(){
		console.log("componentWillUnmount");
		//this.props.toggleNavBar();
	},

	render(){
		//console.log(this.props);
		return(
			<View style={styles.container} >
				<Text style={styles.welcome}> Watchlist </Text>
			</View>
		);
	}

}); 

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width:deviceScreen.width,
    height:deviceScreen.height,
  },

   welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

module.exports = Watchlist;