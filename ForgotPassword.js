var React = require('react-native');

var {
	View,
	Text,
	StyleSheet,
	Component,
} = React;


var ForgotPassword = React.createClass({
	
	render(){
		return(
			<View style={ styles.loading }>
				<Text> ForgotPassword </Text>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	loading:{
		flex : 1
	}
});

module.exports = ForgotPassword;