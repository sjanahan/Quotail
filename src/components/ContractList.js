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
var FormatUtils = require('../services/FormatUtils');

var Listitem = require('react-native-listitem');

var {
	deviceScreen
} = GlobalConstants

var ContractList = React.createClass({
	getInitialState(){
		//console.log("initializing contracts");
		return {
			//contracts : this.props.contracts,
			dataSource: new ListView.DataSource({
				rowHasChanged:(r1,r2) => r1 !== r2
			}),
		};
	},

	componentDidMount(){
		this.updateDataSource(this.props.contracts);
	},


	updateDataSource(data){
		//console.log("Component mounting contract list updating...");
		//console.log(data);
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(data),
		});
	},


	renderRow(item, sec, i){
		console.log(item);
		if (item == undefined){
			return <View></View>;
		}
		////console.log(i + " " + JSON.parse(item));
		//this.setNativeProps(this.props);
		////console.log(this);
		var context = this;
		////console.log(this);

		var swipeoutBtns = [
  		{
  			backgroundColor:GlobalConstants.colors.red,
    		text: 'Delete',
    		onPress: ()=>{this.props.removeContract(this.props.watchlist_row, i)},
  		}];

  		var percentage_change_since_added = 100* (((item.ask+item.bid/2) - (item.curr_ask+item.curr_bid/2))/ (item.ask+item.bid/2)).toFixed(2);
  		if (isNaN(percentage_change_since_added)){
  			percentage_change_since_added = "EXPIRED";
  		}else{
  			percentage_change_since_added += "% since added"
  		}
		
		var contract=(
			/*<SwipeOut right={swipeoutBtns} 
				rowID={i}
          		close={!item.active}
          		onOpen={(sec, i) => this.props.handleSwipeout(sec, this.props.watchlist_row, i)}>*/
				<View style= {styles.row}>
					<Text style={ styles.contractRow } numberOfLines={ 1 }>
						{FormatUtils.normalizeSymbol(item.contract_symbol)}{"      "}        {percentage_change_since_added}
					</Text>
					<TouchableHighlight onPress={ ()=> {this.props.removeContract(this.props.watchlist_row, i)} } >
						<View style={styles.deleteView}>
							<Image style={{resizeMode:'contain'}} source={require('image!remove')}/>
						</View>
					</TouchableHighlight>
				</View>
			//</SwipeOut>
		
		);

		return (
			contract
		);
	},

	render(){
		////console.log(this);
		return(
			<View style={styles.container}>
				<ListView 
				automaticallyAdjustContentInsets={false}
				dataSource={this.state.dataSource} 
				renderRow={this.renderRow}
				pageSize={this.props.contracts.length}
				initialListSize={this.props.contracts.length} 
				ref={component => this._root = component}{...this.props} 
				/>
			</View>
		
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
  deleteView:{
  	alignItems:'center',
  	width:60,
  	height:60,
  	flexDirection: 'column',
  	justifyContent:'center',
  },
  row:{
  	alignItems:'center',
  	backgroundColor:GlobalConstants.colors.gray_mid,
  	flexDirection:'row',
  	padding:2,
  	width:deviceScreen.width,
  	paddingLeft:20
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
  	color:GlobalConstants.colors.text_white,
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

