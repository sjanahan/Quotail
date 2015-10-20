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
		flex : 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop:200,
	}
});

module.exports = Loading;