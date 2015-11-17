'use strict';
var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  ScrollView,
} = React;

var GlobalConstants = require('../constants/GlobalConstants');
var {
  deviceScreen
} = GlobalConstants;
var AuthService = require('../services/AuthService');
var RNFXActions = require('react-native-router-flux').Actions;
var KeyboardEvents = require('react-native-keyboardevents');
var KeyboardEventEmitter = KeyboardEvents.Emitter;

var SignUp = React.createClass({
  getInitialState: function() {
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardDidShowEvent, (frames) => {
      console.log("DID SHOW");
      console.log(frames);
      
      this.setState({keyboardSpace: frames.end.height});
      
      /*let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollTo(frames.begin.height);*/
     
    });
    
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillHideEvent, (frames) => {
      console.log("DID HIDE");
      this.setState({keyboardSpace: 0});
    });

    return {
      firstname:'mobile',
      lastname:'test-lastname',
      email: 'janahansivaraman+mobile86@gmail.com',
      password: 'i9u8y7t6',
      confirm_password: 'i9u8y7t6',
      keyboardSpace:0
    }
  },

  register: function(){
  	AuthService.register(this.state.firstname, 
                         this.state.lastname,
                          this.state.email, 
                          this.state.password, 
                          this.state.confirm_password);
  },

  componentWillUnmount: function() {
    KeyboardEventEmitter.off(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
    KeyboardEventEmitter.off(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
  },

  render: function() {
    var content = (
        <View style={styles.container}>
          <View style = {styles.header} >
          <TouchableHighlight onPress={ ()=>{RNFXActions.login();} }>
            <Text style={styles.back}> Back to Login </Text>
          </TouchableHighlight>
          </View>
          <View style={styles.bg}/>
              <View style={styles.inputContainer}>
                  <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                  <TextInput 
                      style={[styles.input, styles.whiteFont]}
                      placeholder="First Name"
                      placeholderTextColor="#FFF"
                      onChangeText={(text) => this.setState({firstname:text})}
                  />
              </View>
              <View style={styles.inputContainer}>
                  <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                  <TextInput 
                      style={[styles.input, styles.whiteFont]}
                      placeholder="Last Name"
                      placeholderTextColor="#FFF"
                      onChangeText={(text) => this.setState({lastname:text})}
                  />
              </View>
              <View style={styles.inputContainer}>
                  <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                  <TextInput 
                      style={[styles.input, styles.whiteFont]}
                      placeholder="E-mail"
                      placeholderTextColor="#FFF"
                      onChangeText={(text) => this.setState({email:text})}
                  />
              </View>
              <View style={styles.inputContainer}>
                  <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
                  <TextInput 
                      style={[styles.input, styles.whiteFont]}
                      placeholder="Password"
                      placeholderTextColor="#FFF"
                      onChangeText={(text) => this.setState({password:text})}
                  />
              </View>
              <View style={styles.inputContainer}>
                  <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
                  <TextInput
                      password={true}
                      style={[styles.input, styles.whiteFont]}
                      placeholder="Confirm Password"
                      placeholderTextColor="#FFF"
                      onChangeText={(text) => this.setState({confirm_password:text})}
                  />
              </View>
     
          <TouchableHighlight underlayColor='transparent' onPress={this.register}>
          <View style={styles.signin}>
              <Text style={styles.whiteFont}>Register</Text>
          </View>
          </TouchableHighlight>
       </View>
      )
    return (
      <View style={ styles.sview }>
        {content}
        <View style={{height: this.state.keyboardSpace}}></View>
      </View>

      
      
      
 
    );
  }
});


var styles = StyleSheet.create({
    sview:{
      flex:1,
      backgroundColor: GlobalConstants.colors.gray_dark,
    },
    container: {
      flexDirection: 'column',
      justifyContent:'flex-start',
      flex: 1,
      backgroundColor:'#151B20',
      paddingTop:20,
      height: deviceScreen.height,

    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent',
    },

    back:{
      color:GlobalConstants.colors.text_white,
    },
    bg: {
      width: GlobalConstants.deviceScreen.width,
      backgroundColor:GlobalConstants.colors.gray_dark,
      flex:1,
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#00a4b5',
        padding: 20,
        alignItems: 'center',
        marginBottom:20,
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    }
})

module.exports = SignUp;