var React = require('react-native');

var {
	Text,
	StyleSheet,
	ScrollView,
	View,
	AlertIOS,
	TouchableHighlight,
} = React;

var global_styles = require('./Styles');


var MessageView = React.createClass({
	getCurrentItem(){
		return this.props.item;
	},

	render(){
		//console.log(this.props);
		var trade = this.getCurrentItem().name;
		return(
			<ScrollView style={ styles.container }>
				
				{this.props.item.messages.map(function(msg, i){
					return (
					 <TouchableHighlight onPress={ ()=> { AlertIOS.alert(
		                  'Tail trade?',
		                  null,
		            [
		              {text: 'Dismiss', onPress: () => console.log('Foo Pressed!')},
		              {text: 'Yes', onPress: () => console.log('Bar Pressed!')},
		            ] 
		          	)}} >

					<View style={ styles.bubble } key={ i }>
						<Text style={ [styles.messages, global_styles.gray_darkest ] } key={ i }> {msg} </Text>
					</View>

					</TouchableHighlight>);
				})}

				
			</ScrollView>
		);
	}
})


var styles = StyleSheet.create({
	container:{
		flex: 1,
		paddingTop:10,
	},
	bubble:{
	    borderRadius: 5,
	    padding: 5,
	    flexDirection: 'column',
	    alignItems: 'stretch',
	    marginBottom:10,
	    marginLeft:10,
	    marginRight:10,
	    backgroundColor:'#AAE0F7'

	},
	messages:{
		fontFamily: 'HelveticaNeue',
	    fontSize: 16,
	    color: '#D5D5D5',
	    marginBottom: 5,

	}
})


module.exports = MessageView;