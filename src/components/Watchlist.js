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

//var Accordion = require('react-native-collapsible/Accordion');
var NoWatchlistItems = require('./NoWatchlistItems');
var Loading = require('./Loading');

var SwipeOut = require('react-native-swipeout');

var ListItem = require('react-native-listitem');

var ContractList = require('./ContractList');
var tweenState = require('react-tween-state');



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
  		//  datasource rerendered when change is made (used to set Swipeout to active)
  		var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true})

		return {
			watchlist:null,
		    dataSource: ds
		  }
	},


	openChat(item){
		console.log("ONPRESSED")
		this.props.navigator.push({
      		title: `${item.ticker} Hits`,
      		component: MessageView,
      		passProps: { item }
    	});

	},



	/*handleSwipeout(sectionID, rowID) {
	  console.log(this.refs);
	  //this.refs.accordian.open();
	  var copy = this.state.watchlist.slice();
	  
	  for (var i = 0; i < copy.length; i++) {
	    if (i != rowID) copy[i].active = false
	    else copy[i].active = !copy[i].active
	  }
	  this.updateDataSource(copy)
	},*/

	handleExpand(sectionID, rowID) {
	  console.log(this.refs);
	  //this.refs.accordian.open();
	  var copy = this.state.watchlist.slice();
	  
	  for (var i = 0; i < copy.length; i++) {
	    if (i != rowID) copy[i].show_contracts = false
	    else copy[i].show_contracts = !copy[i].show_contracts
	  }
	  this.updateDataSource(copy)
	},

	updateDataSource(data){
		console.log("updating...");
		console.log(data);
		this.setState({
			watchlist: data,
			dataSource: this.state.dataSource.cloneWithRows(data),
		});

		console.log(this.state.watchlist);
	},


	/*renderContracts(msg){
		//console.log(msg);
		var context = this;
		
			return(
				<View style= {styles.contractRow} >
					<Text style={ styles.lastMessage } numberOfLines={ 1 }>
						{msg}
					</Text>
				</View>
			);
			
	},*/

	handleSwipeout(sectionID, watchlist_row_index, rowID) {
	  console.log("HANDLING SWIPEOUT");
	  console.log(watchlist_row_index + " " + rowID);
	  var copy = this.state.watchlist.slice();
	  
	  for (var i = 0; i < copy[watchlist_row_index].messages.length; i++) {
	    if (i != rowID) copy[watchlist_row_index].messages[i].active = false
	    else copy[watchlist_row_index].messages[i].active = true
	  }
	  this.updateDataSource(copy)
	},


	renderRow(item, sec, i){
		console.log(item);
		var context = this;
		var numAlertsText;
		if (item.new_hits == undefined){
			numAlertsText = <Text/>
		}else{
			numAlertsText = <Text style={ styles.numAlerts} > {item.new_hits} </Text>
		}

		/*var swipeoutBtns = [
  		{
  			backgroundColor:GlobalConstants.colors.red,
    		text: 'Delete',
    		onPress: ()=>{this.removeTicker(i)},
  		}];*/

  		//var swipeoutBtns = [];

  		var goToMessageThread=(
			<TouchableHighlight onPress={ this.openChat.bind(this, item) }>
				<Text>></Text>
			</TouchableHighlight>
			
		);

  		var plus_or_minus;
		if (item.show_contracts){
			plus_or_minus = (<Text style={styles.expand}> -  </Text>);
		}else{
			plus_or_minus = (<Text style={styles.expand}> > </Text>);
		}
		
		/*var headerContent =  (
			
			<SwipeOut 
				right={swipeoutBtns}
				rowID={i}
          		close={!item.active}
          		onOpen={(sec, i) => this.handleSwipeout(sec, i)}>
          		<TouchableHighlight onPress={ this.openChat.bind(this, item) }> 
          		<View style={ styles.row }>
          			<TouchableHighlight onPress={()=>{this.handleExpand(sec, i)}}>
          				{plus_or_minus}
          			</TouchableHighlight>
					<View style={ styles.textContainer }>
						<Text style={ styles.name }>{item.ticker } </Text>
					</View>
					{numAlertsText}
				</View>	
				</TouchableHighlight > 
				<View style={ styles.cellBorder } />
			
			</SwipeOut>
			
			
		);*/



		var headerContent =  (
			<View>
          		<TouchableHighlight onPress={ this.openChat.bind(this, item) }> 
          		<View style={ styles.row }>
          			<TouchableHighlight onPress={()=>{this.handleExpand(sec, i)}}>
          				{plus_or_minus}
          			</TouchableHighlight>
					<View style={ styles.textContainer }>
						<Text style={ styles.name }>{item.ticker } </Text>
					</View>
					{numAlertsText}
				</View>	
				</TouchableHighlight > 
				<View style={ styles.cellBorder } />
			</View>	
		);

		console.log("How many messages?" + item.messages.length);
		
		if (!item.show_contracts){
			content = (<View></View>);
		}else{
			content = (<ContractList contracts={item.messages} handleSwipeout={this.handleSwipeout} removeContract={this.removeContract} watchlist_row={i}/>);
		}

		//console.log("made contract list");
		//var accordian = (
			
		return (
		<View>
			{headerContent}
			{content}
		</View>
		);
	},


	removeTicker(i){
		console.log("REMOVING " + this.state.watchlist[i].ticker);

		DataService.deleteTickerFromWatchlist(this.state.watchlist[i].ticker).then(function(data){
			console.log('removed from watchlist');


		});
		var copy = this.state.watchlist.slice();
	    copy.splice(i,1);
	    
	    this.updateDataSource(copy);
	},

	removeContract(watchlist_row_index, contract_index){
		console.log("!!" + watchlist_row_index + " "  + contract_index);

		console.log(this.state.watchlist[watchlist_row_index].messages[contract_index].contract_symbol);
		DataService.deleteContractFromWatchlist(this.state.watchlist[watchlist_row_index].messages[contract_index].contract_symbol).then(function(data){
			console.log('removed contract from watchlist');


		});

		//network call to DB
		var copy = this.state.watchlist.slice();
		console.log("how many contracts?" + copy[watchlist_row_index].messages.length);
		
		copy[watchlist_row_index].messages[contract_index] = {};
		copy[watchlist_row_index].messages.splice(contract_index,1);

		if (copy[watchlist_row_index].messages.length == 0){
			this.removeTicker(watchlist_row_index);
		}else{
			console.log("how many contracts? after removing" + copy[watchlist_row_index].messages.length);
	    	this.updateDataSource(copy);
		}


	},

	render(){
		if (this.state.watchlist == null){
			return <Loading/>
		}
		else if (this.state.watchlist.length == 0){
			return <NoWatchlistItems/>
		} 
		else{
			return(
				<View style={styles.container} >
					<ListView
						ref={component => this._root = component}{...this.props} 
						initialListSize={this.state.watchlist.length} 
						dataSource={ this.state.dataSource } 
						renderRow={ this.renderRow } />
				</View>
			);
		}
	}

}); 


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
    width:deviceScreen.width,
    height:deviceScreen.height,
  },
  expand : {
  	fontSize: 22,
  },
  row:{
  	flex:1,
  	alignItems:'center',
  	backgroundColor:GlobalConstants.colors.gray_dark,
  	flexDirection:'row',
  	padding:10,
  	width:deviceScreen.width,
  },

  numAlertsView:{
  	backgroundColor:GlobalConstants.colors.yellow,
  },
  numAlerts:{
  	backgroundColor:GlobalConstants.colors.yellow,
  	color:GlobalConstants.colors.gray_dark,
  	textAlign:'center'
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