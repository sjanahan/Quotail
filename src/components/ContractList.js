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
	Animated,
} = React;

var MessageView = require('./MessageView');
var DataService = require('../services/DataService');
var _ = require('underscore');
var GlobalConstants = require('../constants/GlobalConstants');
var SwipeOut = require('react-native-swipeout');

var Listitem = require('react-native-listitem');

var {
	deviceScreen
} = GlobalConstants

var ContractList = React.createClass({
	getInitialState(){
		console.log("initializing contracts");
		return {
			//contracts : this.props.contracts,
			dataSource: new ListView.DataSource({
				rowHasChanged:(r1,r2) => true
			})
		};
	},

	componentDidMount(){
		this.updateDataSource(this.props.contracts);
	},


	updateDataSource(data){
		console.log("Component mounting contract list updating...");
		console.log(data);
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(data),
		});
	},


	renderRow(item, sec, i){
		if (item == undefined){
			return <View></View>;
		}
		//console.log(i + " " + JSON.parse(item));
		//this.setNativeProps(this.props);
		//console.log(this);
		var context = this;
		//console.log(this);

		var swipeoutBtns = [
  		{
  			backgroundColor:GlobalConstants.colors.red,
    		text: 'Delete',
    		onPress: ()=>{this.props.removeContract(this.props.watchlist_row, i)},
  		}];
		
		var contract=(
			<SwipeOut right={swipeoutBtns} 
				rowID={i}
          		close={!item.active}
          		onOpen={(sec, i) => this.props.handleSwipeout(sec, this.props.watchlist_row, i)}>
				<View style= {styles.row}>
					<Text numberOfLines={ 1 }>
						{item.contract_symbol}{"\t"}{(item.ask+item.bid/2).toFixed(2)}
					</Text>
				</View>
			</SwipeOut>
		
		);

		return (
			contract
		);
	},

	render(){
		//console.log(this);
		return(
			<Animated.View style={styles.container}>
				<ListView 
				automaticallyAdjustContentInsets={false}
				dataSource={this.state.dataSource} 
				renderRow={this.renderRow}
				ref={component => this._root = component}{...this.props} 
				/>
			</Animated.View>
		
		);


	}


});

var styles = StyleSheet.create({
  container: {
  	paddingTop:0,
    flex: 1,
    backgroundColor: 'green',
    width:deviceScreen.width,
    justifyContent:'flex-start',
    alignItems: 'center',
	},
  row:{
  	flex:1,
  	alignItems:'center',
  	backgroundColor:'#e6e6e6',
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

module.exports = ContractList;

