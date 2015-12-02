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
var deleteImage = (<Image source={require('image!remove')}/>);

var {
	deviceScreen
} = GlobalConstants

var ContractList = React.createClass({
	getInitialState(){
		//console.log("initializing contracts");
		return {
			//contracts : this.props.contracts,
			dataSource: new ListView.DataSource({
				rowHasChanged:(r1,r2) => true
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
		//console.log(item);
		if (item.removed){
			console.log('removed');
			console.log(item);
			return null;
		}

		if (item == undefined){
			console.log('undefined');
			console.log(item);
			return null;
		}
		var context = this;

		var swipeoutBtns = [
  		{
  			backgroundColor:GlobalConstants.colors.red,
    		text: 'Delete',
    		onPress: ()=>{this.props.removeContract(this.props.watchlist_row, i)},
  		}];

  		var percentage_change_since_added =  ((((item.ask+item.bid/2) - (item.curr_ask+item.curr_bid/2))/ (item.ask+item.bid/2)) *100) .toFixed(2);
  		if (isNaN(percentage_change_since_added)){
  			percentage_change_since_added = "EXPIRED";
  		}else{
  			percentage_change_since_added += "% since added"
  		}

  		/*
  							/*<Text style={ styles.contractRow } numberOfLines={ 1 }>
						{FormatUtils.normalizeSymbol(item.contract_symbol)}{"      "}{percentage_change_since_added}
					</Text>*/
		
		var contract=(
			<View style= {styles.row}>
				<Text style={ styles.contractRow } numberOfLines={ 1 }>
					{FormatUtils.normalizeSymbol(item.contract_symbol)}    {percentage_change_since_added}
				</Text>
				<TouchableHighlight onPress={ ()=> {this.props.removeContract(this.props.watchlist_row, i)} } >
					<View style={styles.deleteView}>
						{deleteImage}
					</View>
				</TouchableHighlight>
			</View>
		);

		return (
			contract
		);
	},

	render(){
		return(
			<View style={styles.container}>
				<ListView 
				automaticallyAdjustContentInsets={false}
				dataSource={this.state.dataSource} 
				renderRow={this.renderRow}
				pageSize={1}
				initialListSize={this.props.contracts.length} 
				ref={component => this._root = component}{...this.props} 
				/>
			</View>
		
		);


	}


});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    width:deviceScreen.width,
    justifyContent:'flex-start',
    alignItems: 'center',
	},
  deleteView:{
  	alignItems:'center',
  	width:66,
  	height:33,
  	flexDirection: 'row',
  	justifyContent:'flex-end',
  	padding:4,
  },
  row:{
  	flex:1,
  	alignItems:'center',
  	backgroundColor:GlobalConstants.colors.gray_mid,
  	flexDirection:'row',
  	width:deviceScreen.width,
  	paddingLeft:2,
  	paddingRight:2,
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
  	width:deviceScreen.width,
  	paddingLeft:10,
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
    backgroundColor: GlobalConstants.colors.gray_dark,
    height: 1 / PixelRatio.get(),
    marginLeft: 4
  },
  lastMessage: {
    color: '#999999',
    fontSize: 16
  },
});

module.exports = ContractList;

