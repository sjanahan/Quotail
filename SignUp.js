var React = require('react-native');

var {
	View,
	Text,
	StyleSheet,
	Component,
} = React;


var SignUp = React.createClass({
	
	render(){
		return(
			<View style={ styles.loading }>
				<Text> SIGNUP </Text>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	loading:{
		flex : 1
	}
});

module.exports = SignUp;