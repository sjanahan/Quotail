var React = require('react-native');

var {
	View,
	Text,
	StyleSheet,
	Component,
} = React;


var Loading = React.createClass({
	
	render(){
		return(
			<View style={ styles.loading }>
				<Text> LOADING </Text>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	loading:{
		flex : 1
	}
});

module.exports = Loading;