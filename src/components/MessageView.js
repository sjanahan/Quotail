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
var GlobalConstants = require('../constants/GlobalConstants');

var {
	deviceScreen
} = GlobalConstants;


var MessageView = React.createClass({
	setNativeProps(nativeProps) {
    	this._root.setNativeProps(nativeProps);
  	},

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

			DataService.clearWatchlistContractHits(ticker).then(function(data){
				console.log("componentDidMount messageview cleared hits");
			})
		});
	},

	getHumanReadableDate(timestamp){
		human_readable_date = moment.unix(timestamp/1000).format("MM-DD-YY HH:MM:SS");
		return human_readable_date;
	},

	sortMessages(messages){
		messages.sort(function(a,b){
			if (a.time < b.time) return 1;
			if (a.time > b.time) return -1;
			return 0;
		});

		return messages;
	}
	,



	render(){
		//console.log(this.props);
		var trade = this.getCurrentItem().symbol;
		var getHumanReadableDate = this.getHumanReadableDate;
		var context = this;
		return(
			<View style={ styles.container } >
			<ScrollView 
				ref={component => this._scrollView = component}{...this.props}
				>
				{this.sortMessages(this.state.messageThread).map(function(msg, i){
					return(
					<View style={ styles.bubble } key={ i }>
						<Text style={ [styles.messages, global_styles.gray_darkest ] } key={ i }> 
							{FormatUtils.convertAlertToText(msg) }  
						</Text>
						<Text style={ styles.timestamp }>
							{context.getHumanReadableDate(msg.time) }
						</Text>
					</View>);
				})}
			</ScrollView>
			</View>
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
	timestamp:{
		fontFamily: 'Arial',
	    fontSize: 12,
	    color: GlobalConstants.colors.gray_dark,
	    marginBottom: 5,
	    textAlign: 'right',
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