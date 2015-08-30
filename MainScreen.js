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
} = React;

var SideMenu = require('react-native-side-menu');


var HamburgerMenu = require('./HamburgerMenu');
var clamp = require('clamp');

const People = [
  'red',
  'green',
  'blue',
  'purple',
  'orange',
]

var SWIPE_THRESHOLD = 120;


class MainContentView extends Component{
  constructor(props) {
    super(props);

    //this.buttonClicked = this.buttonClicked.bind(this);

    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      person: People[0],
    }
  }

  goToNextPerson() {
    let currentPersonIdx = People.indexOf(this.state.person);
    let newIdx = currentPersonIdx + 1;

    this.setState({
      person: People[newIdx > People.length - 1 ? 0 : newIdx]
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
    console.log("componentDidMount");
    console.log(this.refs);
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
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
          Animated.decay(this.state.pan.x, {
            velocity: velocity,
            deceleration: 0.98,
          }).start(this._resetState.bind(this))

          Animated.decay(this.state.pan.y, {
            velocity: vy,
            deceleration: 0.985,
          }).start();
        } else {
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
    

  buttonClicked () {
    this.refs.sidemenu.toggleMenu();    
  }
  


  render() {
    let { pan, enter, } = this.state;

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
      <SideMenu ref="sidemenu" touchToClose={true} menu={<HamburgerMenu />}>



        <View style={styles.container} ref="main">
        
        <TouchableHighlight
          style={styles.button}
          onPress={this.buttonClicked.bind(this)}>
            <Text style={styles.buttonText}>Open Side Menu!</Text>
        </TouchableHighlight> 



        <Text style={styles.welcome}>
            Welcome to Quotail!
          </Text>
          <Text style={styles.instructions}>
            Swipe Left for No
          </Text>
          <Text style={styles.instructions}>
            Swipe Right for let me know if you see this again
          </Text>
          <Animated.View style={[styles.card, animatedCardStyles, {backgroundColor: this.state.person}]} {...this.panResponder.panHandlers}>
          </Animated.View>

          <Animated.View style={[styles.nope, animatedNopeStyles]}>
            <Text style={styles.nopeText}>Nope!</Text>
          </Animated.View>

          <Animated.View style={[styles.yup, animatedYupStyles]}>
            <Text style={styles.yupText}>Yup!</Text>
          </Animated.View>
        </View>
      </SideMenu>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width:400,
    height:400,
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
    width: 200,
    height: 200,
    backgroundColor: 'red',
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
  },
  button: {
    //textAlign: 'center',
    //color: '#ffffff',
    flex: -1,
    alignSelf: 'auto',
    marginBottom: 7,
    borderWidth: 1,
    borderRadius: 2
  }
});

module.exports = MainContentView;


