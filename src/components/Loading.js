var React = require('react-native');

var {
	View,
	Text,
	StyleSheet,
	Component,
} = React;

var GlobalConstants = require('../constants/GlobalConstants');


var Loading = React.createClass({
	
	render(){
		return(
			<View style={ styles.loading }>
				<Text style= { styles.word } > LOADING </Text>
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

module.exports = Loading;