var React = require('react-native');

var {
	View,
	Text,
	StyleSheet,
	Component,
} = React;


var NoMoreCards = React.createClass({
	
	render(){
		return(
			<View style={ styles.loading }>
				<Text> No more cards. </Text>
				<Text> Try activating another filter by going to </Text>
				<Text> Side menu > Filters > Hit a bolt </Text>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	loading:{
		flex : 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop:200,
	}
});

module.exports = NoMoreCards;