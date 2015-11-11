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
var FilterPage = React.createClass({
  getInitialState(){
    console.log("initializing filterlist");
    var ds = new ListView.DataSource({
              rowHasChanged:(r1,r2) => r1 !== r2
            });
    return {
      filterlist: [],
      dataSource:ds, 
      
      //filterlist:[],
    };
  },

  componentDidMount(){
    var context = this;
    // network call for filter names and definitions
    DataService.getScanList().then(function(data){
      console.log('the filter page got the list');
      //context.state.filterlist = data;
      context.updateDataSource(data);

      console.log("set the state damnit");

    })
    this.context.menuActions.close();
  },

  updateDataSource(data){
    this.setState({
      filterlist: data,
      dataSource: this.state.dataSource.cloneWithRows(data),
    })
  },

  toggleBolt(i){
    DataService.toggleScanActivation(this.state.filterlist[i].metadata.id);
    

    if (this.state.filterlist[i].metadata.isActivated == true){
      console.log("deactivating scan");
    }else{
      console.log("activting scan");
    }

    // toggling isActivated on that scan name
    this.state.filterlist[i].metadata.isActivated = !this.state.filterlist[i].metadata.isActivated;

    var copy = this.state.filterlist.slice();
    copy[i] = {
      metadata : copy[i].metadata,
      definition: copy[i].definition,
    };
    
    this.updateDataSource(copy);
  },

  renderBolt(item, i){
    //console.log("rerendering  " +  i);
    if (item.metadata.isActivated === true){
      return(
        <TouchableHighlight underlayColor={'white'} onPress={ ()=>{this.toggleBolt(i);} }>
          <Image source={require('image!filter_activated')}/>
        </TouchableHighlight>
      );
    } else {
      return(
        <TouchableHighlight underlayColor={'white'} onPress={ ()=>{this.toggleBolt(i);} }>
          <Image source={require('image!filter_deactivated')}/>
        </TouchableHighlight>
      );
    }
  },

  renderRow(item, sec, i){
    //console.log(item);
    //console.log(sec);
    //console.log(i);

    //console.log(this.state.dataSource);
    return(
          <View>
          <View style={ styles.row }> 
            <View style={ styles.textContainer }>
              <Text style={ styles.name } numberOfLines={ 1 }>
                { item.metadata.name } 
              </Text>
            </View>
            {this.renderBolt(item, i)}
          </View> 
          <View style={ styles.cellBorder } />
          
          </View>


    );
  },

  render(){
    return(
      <View style={styles.container}>
        <ListView dataSource={ this.state.dataSource } renderRow={ this.renderRow } />
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
    color:'#668086',
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
    backgroundColor: '#F2F2F2',
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