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
	TouchableOpacity,
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
var FormatUtils = require('../services/FormatUtils');

var ContractList = require('./ContractList');
var tweenState = require('react-tween-state');
var RefreshableListView = require('react-native-refreshable-listview')
var Q = require('q');
var GlobalStyles = require('../constants/GlobalStyles');

var DataService = require('../services/DataService');

var deleteImage = (<Image source={require('image!remove')}/>);

const deviceScreen = Dimensions.get('window');

var Watchlist = React.createClass({
	componentDidMount(){
		if (this.isMounted() && this.props.watchlist != null){ //protects against first call for watchlist not finished yet
			this.updateDataSource(this.props.watchlist);
		}
	},

	componentWillUnmount(){
		var watchlist = [];
		this.updateDataSource(watchlist);
		this.setState({
			watchlist:null
		});
	},

	reloadWatchlist(){
	    var context = this;
	    DataService.getWatchlist().then(function(watchlist_from_backend){
	      context.updateDataSource(watchlist_from_backend);
	    }); 
	},

	getInitialState(){
		var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => true})
		return {
			watchlist:null,
		    dataSource: ds,
		};
	},


	openChat(item){
		item.new_hits = undefined;
		this.props.navigator.push({
      		title: `Hits`,
      		component: MessageView,
      		passProps: { item }
    	});

	},

	updateDataSource(data){
		console.log(data);
		this.forceUpdate();
		this.setState({
			watchlist: data,
			dataSource: this.state.dataSource.cloneWithRows(data),
		});
	},

	renderRow(item, sec, i){
		if (item.removed){
			return null;
		}
		
		var context = this;
		var numAlertsText;
		if (item.new_hits == undefined){
			numAlertsText = <View style={styles.numAlertsViewNone}>
								<Text style={styles.numAlertsNone}> 
								0
								</Text>
							</View>
		}else{
			numAlertsText = (<View style={styles.numAlertsView}>
								<Text style={styles.numAlerts}> 
								{item.new_hits} 
								</Text>
							</View>)
		}

		var ticker_chg;
		if (item.change_pct > 0){
			ticker_chg = (<Text style = {GlobalStyles.green}>
			{item.last}({item.change_pct.toFixed(2)}%)
			</Text>);
		}else if (item.change_pct < 0){
			ticker_chg = (<Text style = {GlobalStyles.red}>
			{item.last}({item.change_pct.toFixed(2)}%)
			</Text>);

		}else{
			ticker_chg = (<Text style = {{color:GlobalConstants.colors.text_white, }}>
			{item.last}({item.change_pct.toFixed(2)}%)
			</Text>);			
		}

		var headerContent =  (
			<View>
          		<TouchableHighlight onPress={ this.openChat.bind(this, item) }> 
          		<View style={ styles.ticker_row }>
          			
					<View style={ styles.textContainer }>
						<Text style={ styles.name }>{item.ticker}</Text>
					</View>
					<View style={ styles.percentContainer}>
						{ticker_chg}
					</View>

					{numAlertsText}
				</View>	
				</TouchableHighlight > 
				<View style={ styles.cellBorder } />
			</View>	
		);

		var context = this;
		
		content = (item.contracts.map(function(contract_obj, c_i){
					var mid_orig = (contract_obj.ask+contract_obj.bid/2);
					var mid_now = (contract_obj.curr_ask+contract_obj.curr_bid/2)
			  		var percentage_change_since_added =  (((mid_now - mid_orig) / mid_orig) * 100).toFixed(2);
			  		var percent_text;
			  		if (isNaN(percentage_change_since_added)){
			  			percent_text = (<Text style = {{color:GlobalConstants.colors.text_white, }}> "EXPIRED" </Text>);
			  		}else{
						if (percentage_change_since_added > 0){
							percent_text = (<Text style = {GlobalStyles.green}>
							{percentage_change_since_added}%
							</Text>);
						}else if (percentage_change_since_added  < 0){
							percent_text  = (<Text style = {GlobalStyles.red}>
							{percentage_change_since_added}%
							</Text>);

						}else{
							percent_text  = (<Text style = {{color:GlobalConstants.colors.text_white, }}>
							{percentage_change_since_added}%
							</Text>);			
						}
			  		}
					
					console.log(contract_obj);
					if (contract_obj.removed != true){
						return (
							<View style= {styles.row} key={c_i}>
								<View style={ styles.textContainer}>
									<Text style={ styles.contractRow } numberOfLines={ 1 }>
										{FormatUtils.normalizeSymbol(contract_obj.contract_symbol)}       
									</Text>
								</View>
								<View style={ styles.percentContainer }>
									{percent_text}
								</View>
								<TouchableOpacity onPress={ ()=> {context.removeContract(i, c_i)} } >
									<View style={styles.deleteView}>
										{deleteImage}
									</View>
								</TouchableOpacity>
							</View>

						)
					}
					}));
			//content = null;
			
		return (
		<View>
			{headerContent}
			{content}
		</View>
		);
	},


	removeTicker(i){
		this.state.watchlist[i].removed = true;
	    this.updateDataSource(this.state.watchlist);
	},

	removeContract(watchlist_row_index, contract_index){
		DataService.deleteContractFromWatchlist(this.state.watchlist[watchlist_row_index].contracts[contract_index].contract_symbol).then(function(data){
		});

		this.state.watchlist[watchlist_row_index].contracts[contract_index].removed = true;
		
		var tickerHasActiveContracts = false;
		for (var i = 0; i< this.state.watchlist[watchlist_row_index].contracts.length; i++){
			if (this.state.watchlist[watchlist_row_index].contracts[i].removed != true){
				tickerHasActiveContracts = true;
				break;
			}
		}


		if (tickerHasActiveContracts == false){
			this.removeTicker(watchlist_row_index);
		}else{
	    	this.updateDataSource(this.state.watchlist);
		}


	},

	render(){
		if (this.state.watchlist == null){
			this.reloadWatchlist();
			return <Loading/>
		}
		else if (this.state.watchlist.length == 0){
			return <NoWatchlistItems/>
		} 
		else{
			return(

				<View style={styles.container} >
					<RefreshableListView
						ref={component => this._root = component}{...this.props} 
						dataSource={ this.state.dataSource } 
						renderRow={ this.renderRow } 
						loadData={ this.reloadWatchlist }
						refreshDescription={<Text style={{color:GlobalConstants.colors.text_white}}>Retrieving watchlist</Text>}
						pageSize={1}
						refreshingIndictatorComponent={
            				<RefreshableListView.RefreshingIndicator stylesheet={indicatorStylesheet} />
          				}/>
				</View>
			);
		}
	}

}); 

/*
				<View style={styles.container} >
					<ListView
						ref={component => this._root = component}{...this.props} 
						dataSource={ this.state.dataSource } 
						renderRow={ this.renderRow } 
						pageSize={1}/>
				</View>*/
/*
				<View style={styles.container} >
					<RefreshableListView
						ref={component => this._root = component}{...this.props} 
						dataSource={ this.state.dataSource } 
						renderRow={ this.renderRow } 
						loadData={ this.reloadWatchlist }
						refreshDescription={<Text style={{color:GlobalConstants.colors.text_white}}>Retrieving watchlist</Text>}
						pageSize={1}
						refreshingIndictatorComponent={
            				<RefreshableListView.RefreshingIndicator stylesheet={indicatorStylesheet} />
          				}/>
				</View>*/

var indicatorStylesheet = StyleSheet.create({
  wrapper: {
  	flex:1,
  	alignSelf:'center',
    backgroundColor: GlobalConstants.colors.gray_dark,
    height: 60,
    marginTop: 10,
    flexDirection:'column'
  },
})


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalConstants.colors.gray_dark,
    width:deviceScreen.width,
    height:deviceScreen.height,
  },
  expandView:{
  	width:60,
  	height:60,
  	justifyContent:'center',
  	alignItems:'center',
  },
   deleteView:{
  	alignItems:'center',
  	flexDirection: 'row',
  	justifyContent:'flex-start',
  	padding:4,
  	paddingRight:8
  },
  expandButton:{
  	resizeMode:'contain',
  	width:44,
  	height:44,
  },
  expand : {
  	fontSize: 22,
  	color:GlobalConstants.colors.text_gray
  },
  ticker_row:{
  	flex:1,
  	alignItems:'center',
  	justifyContent:'space-between',
  	backgroundColor:GlobalConstants.colors.gray_dark,
  	flexDirection:'row',
  	width:deviceScreen.width,
  	paddingLeft:10,
  	paddingRight:10,
  	paddingTop:10,
  	paddingBottom:10,
  },
  row:{
  	flex:1,
  	alignItems:'center',
  	justifyContent:'space-between',
  	backgroundColor:GlobalConstants.colors.gray_mid,
  	flexDirection:'row',
  	width:deviceScreen.width,
  	paddingLeft:10,
  },
  contractRow:{
  	flex:1,
  	alignItems:'center',
  	justifyContent:'space-between',
  	flexDirection:'row',
  	width:deviceScreen.width,
  	paddingLeft:10,
  },

  numAlertsView:{
  	backgroundColor:GlobalConstants.colors.yellow,
  	borderColor:GlobalConstants.colors.yellow,
  	borderRadius:10,
  	borderWidth:3,
  	marginTop:2,
  	marginBottom:2,
  },
  numAlerts:{
  	backgroundColor:GlobalConstants.colors.yellow,
  	color:GlobalConstants.colors.gray_dark,
  	textAlign:'center',
  	padding:2,
  },
  numAlertsViewNone:{
  	backgroundColor:GlobalConstants.colors.gray_dark,
  	borderColor:GlobalConstants.colors.gray_dark,
  	borderRadius:10,
  	borderWidth:3,
  	marginTop:2,
  	marginBottom:2,
  },
  numAlertsNone:{
  	backgroundColor:GlobalConstants.colors.gray_dark,
  	color:GlobalConstants.colors.gray_dark,
  	textAlign:'center',
  	padding:2,
  },
  contractRow:{
  	flex:1,
  	alignItems:'center',
  	justifyContent:'space-between',
  	backgroundColor:GlobalConstants.colors.gray_mid,
  	color:GlobalConstants.colors.text_white,
  	flexDirection:'row',
  	padding:6,
  	width:deviceScreen.width,
  },

  textContainer:{
  	flex: 1,
  	justifyContent:'flex-start'
  },

  percentContainer:{
  	flex:1,
  	justifyContent:'flex-end'
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
    color:GlobalConstants.colors.text_gray,
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
    backgroundColor: GlobalConstants.colors.gray_mid,
    height: 1 / PixelRatio.get(),
  },
  lastMessage: {
    color: '#999999',
    fontSize: 22
  },
});

var AuthenticatedWrapper = require('./AuthenticatedComponent');
module.exports = AuthenticatedWrapper(Watchlist);