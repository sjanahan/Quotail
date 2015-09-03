var React = require('react-native');

var {
	View,
	StyleSheet,
	Text

} = React;

var styles = StyleSheet.create({
	navBar:{
		height:60,
		backgroundColor:'#00a4b5',
		flex:1,
		tintColor:'black',
	}
});


var NavBar = React.createClass({
	render(){
		return(
			<View style={styles.navBar}>
				<Text>TITLEZ</Text>
			</View>
		);
	}
});