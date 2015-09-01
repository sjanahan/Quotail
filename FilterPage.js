var React = require('react-native');

var {
	View,
	Text,
	Component,
	StyleSheet,
	Dimensions,
} = React;

const deviceScreen = Dimensions.get('window');

class FilterPage extends Component{
	constructor(props) {
    	super(props);
    }

    componentDidMount(){
		//console.log("componentDidMount");
		//console.log(this.props);
		this.props.menuActions.close();
	}

	componentWillUnmount(){
		console.log("componentWillUnmount");
		//this.props.toggleNavBar();
	}

	render(){
		return(
			<View style={styles.container}>
				<Text style={styles.welcome}> Filters </Text>
			</View>
		);
	}
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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