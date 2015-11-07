var React = require('react-native');
var DataService = require('../services/DataService');
var FormatUtils = require('../services/FormatUtils');

var {
	Text,
	StyleSheet,
	ScrollView,
	View,
	AlertIOS,
	TouchableHighlight,
} = React;

var global_styles = require('../constants/Styles');
var moment = require('moment');


var MessageView = React.createClass({
	getInitialState(){
		return{
			messageThread : [],
		}
	},

	getCurrentItem(){
		return this.props.item;
	},

	componentDidMount(){
		var ticker = this.props.item.ticker;
		var context = this;
		console.log();
		DataService.getWatchlistHits(ticker).then(function(data){
			console.log(data);
			context.setState({
				messageThread:data
			});
		});

	},

	getHumanReadableDate(timestamp){
		console.log(timestamp);
		human_readable_date = moment.unix(timestamp/1000).format("MM-DD-YY HH:MM:SS");
		console.log(human_readable_date);
		return human_readable_date;
	},

	render(){
		//console.log(this.props);
		var trade = this.getCurrentItem().symbol;
		var getHumanReadableDate = this.getHumanReadableDate;
		var context = this;
		return(
			<ScrollView style={ styles.container }>
				{this.state.messageThread.map(function(msg, i){
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
						<Text style={ [styles.messages, global_styles.gray_darkest ] } key={ i }> 
						{FormatUtils.convertAlertToText(msg) } {"\n"}{context.getHumanReadableDate(msg.time) }  </Text>
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

// wrapper that checks LoginStore for valid jwt before rendering
// also listens to changes on the store that conditionally render
var AuthenticatedWrapper = require('./AuthenticatedComponent');
module.exports = AuthenticatedWrapper(MessageView);