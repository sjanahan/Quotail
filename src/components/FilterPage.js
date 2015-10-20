var React = require('react-native');

var {
	View,
	Text,
	Component,
	StyleSheet,
} = React;


var GlobalConstants = require('../constants/GlobalConstants');
var {
  deviceScreen
} = GlobalConstants;

class FilterPage extends Component{
	constructor(props) {
    	super(props);
    }

    componentDidMount(){
		this.context.menuActions.close();
	}

	render(){
		return(
			<View style={styles.container}>
				<Text style={styles.welcome}> Filters </Text>
			</View>
		);
	}
}
FilterPage.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalConstants.colors.white,
    width:deviceScreen.width,
    height:deviceScreen.height,
  },

   welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});


module.exports = FilterPage;