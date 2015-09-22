var React = require('react-native');

var {
	Text,
	StyleSheet,
	ScrollView,
	View,
	AlertIOS,
	TouchableHighlight,
} = React;


var MessageView = React.createClass({
	getCurrentItem(){
		return this.props.item;
	},

	render(){
		console.log(this.props);
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
						<Text style={ styles.messages } key={ i }> {msg} </Text>
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
	    backgroundColor: '#262626',
	    borderRadius: 5,
	    padding: 5,
	    flexDirection: 'column',
	    alignItems: 'stretch',
	    marginBottom:10,
	    marginLeft:10,
	    marginRight:10,

	},
	messages:{

		 fontFamily: 'HelveticaNeue',
	    fontSize: 16,
	    color: 'white',
	    marginBottom: 5,

	}
})


module.exports = MessageView;