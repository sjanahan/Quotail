var React = require('react-native');

var {
	View,
	Text,
	Component,
	StyleSheet,
  ListView,
  PixelRatio,
  TouchableHighlight,
  Image,
} = React;


var GlobalConstants = require('../constants/GlobalConstants');
var {
  deviceScreen
} = GlobalConstants;

var DataService = require('../services/DataService');
var yellowbolt = (<Image source={require('image!filter_activated')}/>);
var graybolt = (<Image source={require('image!filter_deactivated')}/>);
var FilterPage = React.createClass({
  getInitialState(){
    var ds = new ListView.DataSource({
              rowHasChanged:(r1,r2) => true
            });
    return {
      filterlist: [],
      dataSource:ds,
    };
  },

  componentDidMount(){
    var context = this;
    // network call for filter names and definitions
    DataService.getScanList().then(function(data){
      context.updateDataSource(data);

    })
    this.context.menuActions.close();
  },

  updateDataSource(_data){
    this.setState({
      filterlist: _data,
      dataSource: this.state.dataSource.cloneWithRows(_data),
    })
  },

  toggleBolt(i){
    console.log(this.state.filterlist[i].metadata);
    if(this.state.filterlist[i].metadata.isGlobal == true){
      return;
    }

    DataService.toggleScanActivation(this.state.filterlist[i].metadata.id);
    this.state.filterlist[i].metadata.isActivated = !this.state.filterlist[i].metadata.isActivated;
    this.updateDataSource(this.state.filterlist);
  },

  renderBolt(item, i){
    if (item.metadata.isActivated === true){
      var yellow_bolt=(
      
        <TouchableHighlight underlayColor={'transparent'} onPress={ ()=>{this.toggleBolt(i);} }>
          <View style={ styles.boltView }>
            {yellowbolt}
          </View>
        </TouchableHighlight>
      );
      return yellow_bolt;
    } else {
      var gray_bolt = (
        <TouchableHighlight underlayColor={'transparent'} onPress={ ()=>{this.toggleBolt(i);} }>
          <View style={ styles.boltView }>
            {graybolt}
          </View>
        </TouchableHighlight>
      );

      return gray_bolt;
    }
  },

  renderRow(item, sec, i){
    var isGlobal = item.metadata.isGlobal == true? (<Text> (Global) </Text>) : (<Text></Text>)
    var renderBoltFn = this.renderBolt(item, i);
    return(
          <View>
          <View style={ styles.row }> 
            <View style={ styles.textContainer }>
              <Text style={ styles.name } numberOfLines={ 1 }>
                { item.metadata.name } {isGlobal}
              </Text>
            </View>
            {renderBoltFn}
          </View> 
          <View style={ styles.cellBorder } />
          
          </View>
    );
  },

  render(){
      return(
        <View style={styles.container}>
          <ListView 
            dataSource={ this.state.dataSource } 
            renderRow={ this.renderRow }
            pageSize={1} />
        </View>
      );
  }
});
	
FilterPage.contextTypes = {
  menuActions: React.PropTypes.object.isRequired
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalConstants.colors.gray_dark,
    width:deviceScreen.width,
    height:deviceScreen.height,
  },
  row:{
    flex:1,
    alignItems:'center',
    backgroundColor:GlobalConstants.colors.gray_dark,
    flexDirection:'row',
    width:deviceScreen.width,
  },
  boltView:{
    alignItems:'center',
    width:88,
    height:44,
    flexDirection: 'row',
    justifyContent:'flex-end',
    padding:4,
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
    paddingLeft:10,
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    color:GlobalConstants.colors.text_white,
    alignItems:'center',
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
    fontSize: 12
  },
});

// wrapper that checks LoginStore for valid jwt before rendering
// also listens to changes on the store that conditionally render
var AuthenticatedWrapper = require('./AuthenticatedComponent');

module.exports = AuthenticatedWrapper(FilterPage);