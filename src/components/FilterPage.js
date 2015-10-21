var React = require('react-native');

var {
	View,
	Text,
	Component,
	StyleSheet,
  ListView,
  PixelRatio,
} = React;


var GlobalConstants = require('../constants/GlobalConstants');
var {
  deviceScreen
} = GlobalConstants;

var DataService = require('../services/DataService');
var FilterPage = React.createClass({
  getInitialState(){
    console.log("initializing filterlist");
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged:(r1,r2) => r1 !== r2
      })
    };
  },

  componentDidMount(){
    var context = this;
    // network call for filter names and definitions
    DataService.getFilters().then(function(data){
      console.log('the filter page got the list');
      context.updateDataSource(data);

      console.log("set the state damnit");

    })
    this.context.menuActions.close();
  },

  updateDataSource(data){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data)
    })
  },

  renderRow(item){
    return(
          <View>
          <View style={ styles.row }> 
            <View style={ styles.textContainer }>
              <Text style={ styles.name } numberOfLines={ 1 }>
                { item.metadata.name }
              </Text>
            </View>
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
    alignItems:'center'
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