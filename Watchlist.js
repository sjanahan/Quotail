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

var WATCHLIST_ITEMS = [
	{
		ticker:'RDUS',
		name: 'Radius',
		messages: ['9/12/15: short term bear', '9/16/15: bullish sweep'],
	},
	{
		ticker:'HRTX',
		name:'Heron Therapeutics',
		messages: ['9/16/15: over a million']
	}
];

const deviceScreen = Dimensions.get('window');

var Watchlist = React.createClass({
	componentWillMount(){
		// network call to retrieve watchlist per user
		this.updateDataSource(WATCHLIST_ITEMS);
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
    marginBottom: 2
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

module.exports = Watchlist;