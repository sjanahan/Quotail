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

var WATCHLIST_ITEMS = [
	{
		ticker:'TE',
		name: 'TECO Energy',
		messages: ['9/1/15: TECO Scan'],
	},
	{
		ticker:'MEG',
		name:'Media General',
		messages: ['9/16/15: TECO Scan', '9/18/15: TECO Scan'],
	}
];

const deviceScreen = Dimensions.get('window');

var Watchlist = React.createClass({
	componentWillMount(){
		//this.updateDataSource(WATCHLIST_ITEMS);
		
		var context = this;
		DataService.getWatchlist().then(function(watchlist_from_backend){
			console.log('using the watchlist items to populate view');
			console.log(watchlist_from_backend);
			console.log(WATCHLIST_ITEMS);
			context.updateDataSource(watchlist)

			//context.updateDataSource()
		});
		
	},

	getInitialState(){
		return {
			dataSource: new ListView.DataSource({
				rowHasChanged:(r1,r2) => r1 !== r2
			})
		};
	},

	


	openChat(item){
		this.props.navigator.push({
      		title: `${item.ticker}`,
      		component: MessageView,
      		passProps: { item }
    });

	},

	updateDataSource(data){
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(data)
		})
	},

	renderRow(item){
		return(
			<View>
				<TouchableHighlight onPress={ this.openChat.bind(this, item) }>
					<View>
					<View style={ styles.row }>
						<Image
							source={ require('image!bell') }
							style={ styles.cellImage }
						/> 
						<View style={ styles.textContainer }>
							<Text style={ styles.name } numberOfLines={ 1 }>
			                  { item.ticker }
			                </Text>
			                <Text style={ styles.time } numberOfLines={ 1 }>
			                   11:59 
			                </Text>
			                <Text style={ styles.lastMessage } numberOfLines={ 1 }>
			                  {item.messages[item.messages.length-1]}!
			                </Text>
						</View>
					</View>	
					<View style={ styles.cellBorder } />
					
					</View>
				</TouchableHighlight>
			</View>

		);


	},

	render(){
		//console.log(this.props);
		return(
			<View style={styles.container} >
				<ListView dataSource={ this.state.dataSource } renderRow={ this.renderRow } />
			</View>
		);
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
  textContainer:{
  	flex: 1,
  },
  cellImage: {
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    width: 60
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    color:'#668086'
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
    fontSize: 12
  },
});

var AuthenticatedWrapper = require('./AuthenticatedComponent');
module.exports = AuthenticatedWrapper(Watchlist);