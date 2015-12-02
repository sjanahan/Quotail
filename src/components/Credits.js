var React = require('react-native');

var {
	Text,
	StyleSheet,
	View,
	ScrollView
} = React;

var GlobalConstants = require('../constants/GlobalConstants');


var Credits = React.createClass({
	componentDidMount(){
		this.context.menuActions.close();
	},

	render(){
		var credits = (<View style={ styles.sview } >
						<Text style={ styles.writing }>
						Binocular Icon made by Freepik
						from www.flaticon.com
						is licensed under CC BY 3.0{"\n"}</Text>

						<Text style={ styles.writing }>
						Thunderbolt Icon made by Freepik 
						from www.flaticon.com is licensed under CC BY 3.0{"\n"}</Text>

						<Text style={ styles.writing }>
						X Icon made by Google from 
						www.flaticon.com is licensed under 
						CC BY 3.0{"\n"}</Text>

						<Text style={ styles.writing }>
						Remove Icon made by Google from 
						www.flaticon.com is licensed CC BY 3.0{"\n"}</Text>

						<Text style={ styles.writing }>Settings Icon made by 
						Anton Saputro 
						from www.flaticon.com 
						is licensed under CC BY 3.0{"\n"}</Text>

						<Text style={ styles.writing }>Checkmark Icon made by Google from 
						www.flaticon.com is licensed under CC BY 3.0{"\n"}</Text>

						<Text style={ styles.writing }>Arrow Down Icon made by Freepik from www.flaticon.com 
						is licensed under CC BY 3.0</Text>
					</View>
					);
		return (
			<ScrollView style={styles.sview}>
			{credits}
			</ScrollView>
			
		);

	}
});

Credits.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};

var styles = StyleSheet.create({
	sview:{
      flex:1,
      backgroundColor: GlobalConstants.colors.gray_dark,
      paddingLeft:10,
      paddingRight:10,
      paddingTop:10,
    },
    writing:{
       color: GlobalConstants.colors.text_white,
    }

})

module.exports = Credits


