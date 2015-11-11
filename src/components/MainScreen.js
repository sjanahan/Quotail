/**
 * Sample React Native App
 * https://github.com/facebook/react-native

 @flow
 */

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Navigator,
  Animated,
  Component,
  PanResponder,
  TouchableHighlight,
  Dimensions,
  Image,
  AlertIOS,
  ActivityIndicatorIOS,
} = React;

var GlobalStyles = require('../constants/GlobalStyles');

var GlobalConstants = require('../constants/GlobalConstants');
var {
  colors,
  deviceScreen,
  querystring
} = GlobalConstants;

var clamp = require('clamp');
var Q = require('q');
var _ = require('underscore');
var moment = require('moment');

var LoginStore = require('../stores/LoginStore');
var LoginActions = require('../actions/LoginActions');
var DataService = require('../services/DataService');

var FormatUtils = require('../services/FormatUtils');

/*var STACK_OF_CARDS = [
  {
  name: 'Cheniere Energy, Inc.',
  ticker:'LNG',
  id: 3423, // for fetching from chartmill
  filter_tags: ['onTheBid']
  },
  {name: 'TECO Energy', // for display purposes
  ticker:'TE',
  id: 10797, // for fetching from chartmill
  filter_tags: ['TECO scan']
  },
  {
  name: 'Media General',
  ticker:'MEG',
  id: 8820, // for fetching from chartmill
  filter_tags: ['TECO scan']
  },
  {
  name:'Cablevision',
  ticker:'CVC',
  id: 8384, // for fetching from chartmill
  filter_tags: ['TECO scan']
  },
  {
  name: 'Comerica Incorporated',
  ticker:'CMA',
  id: 5835, // for fetching from chartmill
  filter_tags: ['onTheBid']
  },
  {
  name: 'N/A',
  id: 0, // for fetching from chartmill
  filter_tags: ['NONE']
  }
  ];*/

var no_more_cards =   {
  name: 'N/A',
  id: 0, // for fetching from chartmill
  scan_names: ['NONE']
  };

var querystring = require ('querystring');

var SWIPE_THRESHOLD = 120;

class MainScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      //person: People[0],
      STACK_OF_CARDS: [],
      graph:null,
      card: null,
      graph_loading:true,
    }
  }

  goToNextPerson() {
    //let currentPersonIdx = People.indexOf(this.state.person);
    //console.log(currentPersonIdx);

    //let newIdx = currentPersonIdx + 1;
    

    let currentCardIndex = this.state.STACK_OF_CARDS.indexOf(this.state.card);
    if (currentCardIndex == -1){
      currentCardIndex == this.state.STACK_OF_CARDS.length;
    }

    console.log(currentCardIndex);
    let no_more_tickers_index = this.state.STACK_OF_CARDS.length - 1;
    let newCardIndex = currentCardIndex + 1;
    let card = newCardIndex > no_more_tickers_index? no_more_cards: this.state.STACK_OF_CARDS[newCardIndex];

    this.setState({
      card: card,
    });
  }


  componentDidMount() {
    var context = this;
    console.log("MAIN SCREEN MOUNTING");
    DataService.getHits().then(function(data){
      console.log("THE STACK IS BACK");
      console.log(data);

      var first_card = data.length == 0 ? no_more_cards: data[0];

      context.setState({
        STACK_OF_CARDS : data,
        card:first_card,
      });


      context._animateEntrance();
    });
    
    this._animateEntrance();


   
  }

  _animateEntrance() {
    var context = this;


    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  }

  componentWillMount() {

      this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx > 0) {
          console.log("to the right");
          velocity = clamp(vx, 3, 5);
        } else {
          console.log("to the left");
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
          if (velocity > 0){
            this.swipeRight(this.state.card);
          }else{
            this.swipeLeft(this.state.card);
          }
          Animated.decay(this.state.pan.x, {
            velocity: velocity,
            deceleration: 0.98,
          }).start(this._resetState.bind(this))

          Animated.decay(this.state.pan.y, {
            velocity: vy,
            deceleration: 0.985,
          }).start();
        } else {
          console.log("Not past threshold");
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  }

  _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this.goToNextPerson();
    this._animateEntrance();
  }

 /* Store events */
  _onChange() {
    this.setState(getStateFromStore());
  }

  swipeRight(card){
    console.log("swipe right");
    console.log(card);
    _.each(card.hit_ids, function(hit_id){
      DataService.setAsDelivered(hit_id);
    })

    DataService.addToWatchlist(card).then(function(){
      console.log("...whatever was swiped right was added");
      DataService.addToWatchlistHits(card).then(function(){
        console.log("added to watchlist hits");
      });
    });
  }

  swipeLeft(card){
    console.log("swiped left");
    console.log(card.hit_ids);
    
    _.each(card.hit_ids, function(hit_id){
      DataService.setAsDelivered(hit_id);
    })
  }


  render() {
    let { pan, enter, id } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]})
    let scale = enter;

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [0.5, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {transform: [{scale: yupScale}], opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp'});
    let animatedNopeStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity};
    if (this.state.card == null){
      var Loading = require('./Loading');
      return <Loading/>
    }else if (this.state.card == no_more_cards){
      var NoMoreCards = require('./NoMoreCards');
      return <NoMoreCards/>
    }else{
      if ((this.state.card.type === "C" && this.state.card.side === "B") ||
        (this.state.card.type === "P" && this.state.card.side == "S")) {
        this.state.card.isBullish = true;
      } else if ((this.state.card.type === "C" && this.state.card.side === "S") ||
        (this.state.card.type === "P" && this.state.card.side == "B")) {
        this.state.card.isBearish = true;
      }else{
        this.state.card.isNeutral = true;
      }

      console.log(this.state.graph);
            /*<View style={styles.filter_container}>
             {this.state.card.scan_names.map(function(scan_name, i){
                return <Text style={[GlobalStyles.yellow, styles.filter, GlobalStyles.darker_gray]} key={i}> {scan_name}</Text>
                       
             })} 
             </View>*/

      var graph_url = 'http://localhost:3009/api/chain/graph/'+ this.state.card.contract_symbol + '?height='+ deviceScreen.height*.55 + '&width='+ deviceScreen.width+ '&token=' + LoginStore.get_jwt();
      console.log ("GRAPH URL  " + graph_url);
      /*var loader = this.state.graph_loading ?
      <View style={styles.progress}>
        <ActivityIndicatorIOS style={{marginLeft:deviceScreen.width /2, marginTop:deviceScreen.height/3}}/>
      </View> : null;

      console.log(loader);*/

      return (
        <View style={styles.container} menuActions={this.props.menuActions}>
          <Animated.View style={[styles.card, animatedCardStyles]} {...this.panResponder.panHandlers}>
            <Text style={[styles.welcome, 
              this.state.card.isNeutral==true && GlobalStyles.light_gray,
              this.state.card.isBullish==true && GlobalStyles.green,
              this.state.card.isBearish==true && GlobalStyles.red]} textAlign={'center'}> {FormatUtils.convertAlertToText(this.state.card)} </Text>
            
            
            <Image 
              resizeMode={'contain'} 
              style={styles.graph} 
              source={{uri:graph_url}}>
            </Image>

            {this.state.card.scan_names.map(function(scan_name, i){
                return <Text style={[GlobalStyles.yellow, styles.filter, GlobalStyles.darker_gray]} key={i}> {scan_name}</Text>
                       
             })}

             <Text style = {GlobalStyles.light_gray} > {moment.unix(this.state.card.time/1000).format("MM-DD-YY HH:MM:SS")} </Text> 
         
          </Animated.View>
          
          <View style={styles.yup_or_no}>
            <TouchableHighlight underlayColor='#e6e6e6' onPress={ ()=> {this.swipeLeft(this.state.card); this._resetState();}}>
              <View style={styles.no_button}><Image source={require('image!no')}/></View>
            </TouchableHighlight>


            
            <TouchableHighlight underlayColor='#e6e6e6' onPress={ ()=> {this.swipeRight(this.state.card); this._resetState();}}>
              <View style={styles.yes_button}><Image source={require('image!yes')}/></View>
            </TouchableHighlight>

          <Animated.View style={[styles.nope, animatedNopeStyles]}>
            <Text style={styles.nopeText}>Don't Watch!</Text>
          </Animated.View>

          <Animated.View style={[styles.yup, animatedYupStyles]}>
            <Text style={styles.yupText}>Add to Watch!</Text>
          </Animated.View>
          </View>
        </View>
    
      );
    }
    
  }

}


/*            <TouchableHighlight underlayColor='#e6e6e6' onPress={ ()=> { AlertIOS.alert(
                    'Tail trade?',
                    `${this.state.card.name}`,
              [
                {text: 'Dismiss'},
                {text: 'Yes', onPress: () => { this._resetState(); } } ,
              ] 
            )}} >
              <View style={ styles.tail_button }><Image source={ require('image!tail') }/></View>
            </TouchableHighlight>*/


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: GlobalConstants.colors.gray_dark,
    flexDirection:'column',
    paddingTop:64,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',

  },
  filter:{
    textAlign: 'center',
    color: '#333333',
    padding:4,
    borderRadius:5,
    overflow:'hidden'
  },
  card: {
    borderColor:'#E6E6E6',
    justifyContent: 'center',
    alignItems:'center',
  },
  graph: {
    justifyContent: 'center',
    alignItems:'center',
    height:deviceScreen.height*.55,
    width:deviceScreen.width*.95,
  },
  yup_or_no:{    
    backgroundColor: GlobalConstants.colors.gray_dark,
    borderColor:'#E6E6E6',
    flexDirection:'row',
    height:deviceScreen.height*.15,
  },
  yes_button:{
    flex:.2,
    width: deviceScreen.width*.5,
    
    borderRadius:3,
    borderColor:'#E6E6E6',
    alignItems: 'center',
    opacity:1,
    justifyContent: 'center',
  },
  no_button:{
    flex:.2,
    width: deviceScreen.width*.5,
    borderRadius:3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tail_button:{
    flex:.2,
    width: deviceScreen.width*.315,
    backgroundColor: GlobalConstants.colors.gray_dark,
    alignItems: 'center',
    justifyContent: 'center',
  },

  yup: {
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 20,
  },
  yupText: {
    fontSize: 16,
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    bottom: 20,
    padding: 20,
    borderRadius: 5,
    left: 20,
  },
  nopeText: {
    fontSize: 16,
    color: 'red',
  }
});


// wrapper that checks LoginStore for valid jwt before rendering
// also listens to changes on the store that conditionally render
var AuthenticatedWrapper = require('./AuthenticatedComponent');
module.exports = AuthenticatedWrapper(MainScreen);