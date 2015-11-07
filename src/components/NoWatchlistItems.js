var React = require('react-native');

var {
	View,
	Text,
	StyleSheet,
	Component,
} = React;


var NoWatchlistItems = React.createClass({
	
	render(){
		return(
			<View style={ styles.loading }>
				<Text> No watch list items. </Text>
				<Text> If you swipe right on a card, you </Text>
				<Text> can keep a track of the contracts </Text>
				<Text> on this screen </Text>
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

module.exports = NoWatchlistItems;