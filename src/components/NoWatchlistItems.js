var React = require('react-native');

var {
	View,
	Text,
	StyleSheet,
	Component,
} = React;

var GlobalConstants = require('../constants/GlobalConstants');



var NoWatchlistItems = React.createClass({
	
	render(){
		return(
			<View style={ styles.loading }>
				<Text style= { styles.word }> No watch list items. </Text>
				<Text style= { styles.word }> If you swipe right on a card, you </Text>
				<Text style= { styles.word }> can keep a track of the contracts </Text>
				<Text style= { styles.word }> on this screen </Text>
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
		backgroundColor:GlobalConstants.colors.gray_dark
	},
	word:{
		color: GlobalConstants.colors.text_white,
	}
});

module.exports = NoWatchlistItems;