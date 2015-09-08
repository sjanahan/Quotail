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
} = React;

const deviceScreen = Dimensions.get('window');


var clamp = require('clamp');

const People = [
  'white',
]

var STACK_OF_CARDS = [
  {name: 'Radius Pharmaceuticals', // for display purposes
  id: 16224, // for fetching from chartmill
  filter_tags: ['day trade', 'long term bear',
  'over a million']
  },
  {
  name:'SPY',
  id: 7114, // for fetching from chartmill
  filter_tags: ['mid term bear']
  },
  {
  name: 'HRTX',
  id: 16524, // for fetching from chartmill
  filter_tags: ['day trade', 'long term bear',
  'over a million']
  },
  {
  name: 'SKetchers X',
  id: 16324, // for fetching from chartmill
  filter_tags: ['day trade', 'long term bear',
  'over a million']
  },
  {
  name: 'CoMricA Bank and shit',
  id: 824, // for fetching from chartmill
  filter_tags: ['day trade', 'long term bear',
  'over a million']
  },
  {
  name: 'No more',
  id: 0, // for fetching from chartmill
  filter_tags: ['no more tickers']
  }
  ];


var SWIPE_THRESHOLD = 120;

class MainScreen extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      person: People[0],
      card: STACK_OF_CARDS[0],
      yes_watchlist:[],
      no_watchlist:[],
    }
  }

  goToNextPerson() {
    let currentPersonIdx = People.indexOf(this.state.person);
    let newIdx = currentPersonIdx + 1;
    

    let currentCardIndex = STACK_OF_CARDS.indexOf(this.state.card)
    let no_more_tickers_index = STACK_OF_CARDS.length - 1;
    let newCardIndex = currentCardIndex + 1;

    this.setState({
      person: People[newIdx > People.length - 1 ? 0 : newIdx],
      card: STACK_OF_CARDS[newCardIndex > no_more_tickers_index? no_more_tickers_index: newCardIndex],
    });
  }

  componentDidMount() {
    this._animateEntrance();
  }

  _animateEntrance() {
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
            // make some network call
            this.state.yes_watchlist.push(this.state.card);
          }else{
            // make some network call
            this.state.no_watchlist.push(this.state.card);
          }
          Animated.decay(this.state.pan.x, {
            velocity: velocity,
            deceleration: 0.98,
          }).start(this._resetState.bind(this))

          /*Animated.decay(this.state.pan.y, {
            velocity: vy,
            deceleration: 0.985,
          }).start();*/
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
    console.log(this.state.yes_watchlist);
    console.log(this.state.no_watchlist);
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this.goToNextPerson();
    this._animateEntrance();
  }


  render() {
    console.log(this.props);
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
    return (
      <View style={styles.container} menuActions={this.props.menuActions}>
        <Animated.View style={[styles.card, animatedCardStyles, {backgroundColor: this.state.person}]} {...this.panResponder.panHandlers}>
          
          <Image resizeMode={'contain'} style={styles.graph} source={{uri:'http://chartmill.com/chartsrv/chart.php?width=400&height=370&sheight=120&id='+this.state.card.id+'&timeframe=DAILY&elements=0&type=CANDLES&cl=F'}}>
          <Text style={styles.instructions} textAlign={'center'}> {this.state.card.name} </Text>
         
          </Image>

           <Text style={styles.instruction}> {this.state.card.filter_tags + "\t"} </Text>
          
        </Animated.View>
        
        <Animated.View style={[styles.nope, animatedNopeStyles]}>
          <Text style={styles.nopeText}>Nope!</Text>
        </Animated.View>

        <Animated.View style={[styles.yup, animatedYupStyles]}>
          <Text style={styles.yupText}>Yup!</Text>
        </Animated.View>

        <View style={styles.yup_or_no}>
          <TouchableHighlight onPress={ ()=> {this.state.yes_watchlist.push(this.state.card); this._resetState();}}>
            <View style={styles.no_button}></View>
          </TouchableHighlight>
          <TouchableHighlight onPress={ ()=> {this.state.no_watchlist.push(this.state.card); this._resetState();}}>
            <View style={styles.yes_button}></View>
          </TouchableHighlight>
        </View>
      </View>
  
    );
    
  }

}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    width:deviceScreen.width,
    height:deviceScreen.height,
    paddingTop:75
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  card: {
    width: deviceScreen.width * .95,
    height: deviceScreen.height * (.65),
    borderWidth:2,
    borderColor:'#E6E6E6',
    justifyContent: 'center'
  },
  graph: {
    width: deviceScreen.width  * .90,
    height: deviceScreen.height * (.60),
  },
  yup_or_no:{    
    width: deviceScreen.width * .95,
    height: deviceScreen.height * (.2),
    backgroundColor: 'white',
    borderWidth:2,
    borderColor:'#E6E6E6',
    opacity:.7,
    flexDirection:'row',
  },
  yes_button:{
    width: deviceScreen.width*.47,
    height: deviceScreen.height * .19,
    backgroundColor: 'green',
    borderWidth:2,
    borderColor:'#E6E6E6',
  },
  no_button:{
    width: deviceScreen.width*.47,
    height: deviceScreen.height * .19,
    backgroundColor: 'red',
    borderWidth:2,
    borderColor:'#E6E6E6',
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

module.exports = MainScreen;


