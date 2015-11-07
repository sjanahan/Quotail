var React = require('react-native');
var {
	View,
	Component,
	Text,
	StyleSheet,
	Dimensions,
	PixelRatio,
	ListView,
	Image,
	TouchableHighlight,
	
} = React;

var MessageView = require('./MessageView');
var DataService = require('../services/DataService');
var _ = require('underscore');
var GlobalConstants = require('../constants/GlobalConstants');
var Accordion = require('react-native-accordion');
var NoWatchlistItems = require('./NoWatchlistItems');
var Loading = require('./Loading');


const deviceScreen = Dimensions.get('window');

var Watchlist = React.createClass({
	componentWillMount(){
		var context = this;
		DataService.getWatchlist().then(function(watchlist_from_backend){
			context.updateDataSource(watchlist_from_backend);
		});
	},

	getInitialState(){
		console.log("initializing watchlist");
		return {
			watchlist : null,
			dataSource: new ListView.DataSource({
				rowHasChanged:(r1,r2) => r1 !== r2
			})
		};
	},

	openChat(item){
		this.props.navigator.push({
      		title: `${item.ticker} Hits`,
      		component: MessageView,
      		passProps: { item }
    	});

	},

	removeContract(contract){
		console.log("GSFGFSGFS");
	},

	updateDataSource(data){
		console.log("updating...");
		console.log(data);
		this.setState({
			watchlist: data,
			dataSource: this.state.dataSource.cloneWithRows(data),
		});
	},

	
	/*renderContracts(messages){
		_.each(messages, function(message){
			return (
				<Text style={ styles.lastMessage } numberOfLines={ messages.length }> 
					{message} 
				</Text>
			);
		});
	},*/

	/*<Text style={ styles.lastMessage } numberOfLines={ item.messages.length }>
		                  		HI{"\n"}thisisatest.{"\n"}{"\n"}{"\n"}{"\n"}
		                  	</Text>*/
		               /*<Image
							source={ require('image!bell') }
							style={ styles.cellImage }
						/> */
	renderContracts(msg){
		console.log(msg);
		var context = this;
		
			return(
				<View style= {styles.contractRow} >
	        		<TouchableHighlight onPress={ ()=> {context.removeContract("FDSFSD");} } >
	        			<Image style={ styles.removeImage } source={ require('image!remove') }/>
					</TouchableHighlight> 
					<Text style={ styles.lastMessage } numberOfLines={ 1 }>
						{msg}
					</Text>
				</View>
			);
			
	},

	renderRow(item){
		console.log(item);
		var context = this;
		var numAlertsText;
		if (item.new_hits == undefined){
			numAlertsText = <Text/>
		}else{
			numAlertsText = <Text style={ styles.numAlerts} > {item.new_hits} </Text>
		}

		var header = (
			//<TouchableHighlight onPress={ this.openChat.bind(this, item) }>
				<View>
				<View style={ styles.row }>
					<View style={ styles.textContainer }>
						<Text style={ styles.name }> {numAlertsText}     { item.ticker } </Text>
					</View>

					<TouchableHighlight onPress={ this.openChat.bind(this, item) }>
					<Text> > </Text>
					</TouchableHighlight>

				</View>	
					<View style={ styles.cellBorder } />
					
				</View>);

		console.log(header);
			//</TouchableHighlight>); 

		//var content = (

						
		var content = (item.messages.map(function(msg, i){
		                	return context.renderContracts(msg);
		                }));

		//var content = (<Text>"LOL"</Text>);

		//var content = this.renderContracts(item);



			return (
				<Accordion
					header = {header}
					content={content}
					easing="easeOutCubic" />
			);
					
			

	
	},

	render(){
		//console.log(this.state.watchlist.length);
		if (this.state.watchlist == null){
			return <Loading/>
		}
		else if (this.state.watchlist.length == 0){
			return <NoWatchlistItems/>
		} 
		else{
			return(
				<View style={styles.container} >
					<ListView dataSource={ this.state.dataSource } renderRow={ this.renderRow } />
				</View>
			);
		}
	}

}); 

/*
{WATCHLIST_ITEMS.map(function(item, i){
					return( 
						<View style={styles.msg_list}>
							<Text style={styles.welcome} key={i}> {item.ticker} </Text>
						</View>
					);
				})}
*/

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
    width:deviceScreen.width,
    height:deviceScreen.height,
  },
  row:{
  	flex:1,
  	alignItems:'center',
  	backgroundColor:'white',
  	flexDirection:'row',
  	padding:10,
  	width:deviceScreen.width,
  },

  numAlertsView:{
  	backgroundColor:GlobalConstants.colors.yellow,
  	borderRadius:4,
  },
  numAlerts:{
  	backgroundColor:GlobalConstants.colors.yellow,
  	color:GlobalConstants.colors.gray_dark,
  	textAlign:'right'
  },
  contractRow:{
  	flex:1,
  	alignItems:'center',
  	backgroundColor:'white',
  	flexDirection:'row',
  	padding:6,
  	width:deviceScreen.width,
  },

  textContainer:{
  	flex: 1,
  },
  cellImage: {
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    width: 60
  },
  removeImage: {
    height: 16,
    marginRight: 10,
    width: 16
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    color:'#668086',
    textAlign:'left',
  },
  time: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 12,
    color: '#cccccc'
  },

  cellBorder: {
    backgroundColor: '#F2F2F2',
    height: 1 / PixelRatio.get(),
    marginLeft: 4
  },
  lastMessage: {
    color: '#999999',
    fontSize: 16
  },
});

var AuthenticatedWrapper = require('./AuthenticatedComponent');
module.exports = AuthenticatedWrapper(Watchlist);