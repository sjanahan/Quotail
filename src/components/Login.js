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


var AuthService = require('../services/AuthService');
var LoginActions = require ('../actions/LoginActions');
var GlobalConstants = require('../constants/GlobalConstants');
var KeyboardEvents = require('react-native-keyboardevents');
var KeyboardEventEmitter = KeyboardEvents.Emitter;

var Login = React.createClass({
  getInitialState: function() {
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardDidShowEvent, (frames) => {
      this.setState({keyboardSpace: frames.end.height});
    });
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillHideEvent, (frames) => {
      this.setState({keyboardSpace: 0});
    });

    return {
      username: '',
      password: '',
      keyboardSpace: 0,
    }
  },

  signIn: function() {
  	AuthService.login(this.state.username, this.state.password);
  },

  forgotPassword: function(){
    LoginActions.forgotPassword();
  },

  signUp: function(){
    LoginActions.signUp();
  },

  componentWillUnmount: function() {
    KeyboardEventEmitter.off(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
    KeyboardEventEmitter.off(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
  },

   render: function(){
    var content = (
      <View style={styles.container}>
          <View style={ styles.header}>
           <Image style={ styles.qtTitle } source={ require('image!quotailTransparentBackground')}/>
          </View>  
            <View style={styles.bg}/>
           
                <View style={styles.inputContainer}>
                    <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                    <TextInput 
                        style={[styles.input, styles.whiteFont]}
                        placeholder="E-mail"
                        placeholderTextColor="#FFF"
                        ref='email'
                        onChangeText={(text) => this.setState({username:text})}
                       
                        
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
                    <TextInput
                        password={true}
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Password"
                        placeholderTextColor="#FFF"
                        ref='password'
                        onChangeText={(text) => this.setState({password:text})}
                        
                        
                        
                    />
                </View>
                
                
                <TouchableHighlight underlayColor='transparent' onPress={ this.forgotPassword }>
                <View style={styles.forgotContainer}>
                    <Text style={styles.greyFont}>Forgot Password</Text>
                </View>
                </TouchableHighlight>
          
            
            <TouchableHighlight underlayColor='transparent' onPress={this.signIn}>
            <View style={styles.signin}>
                <Text style={styles.whiteFont}>Sign In</Text>
            </View>
            </TouchableHighlight>

            <TouchableHighlight underlayColor='transparent' onPress={ this.signUp } >
            <View style={styles.signup} >
                <Text style={styles.greyFont}>Don't have an account?<Text style={styles.whiteFont}>  Sign Up</Text></Text>
            </View>
            </TouchableHighlight>
        </View>


    );
   
    return (
      <View style={ styles.sview} >
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
      justifyContent: 'flex-start',
      flexDirection: 'column',
      flex:1,
      backgroundColor: GlobalConstants.colors.gray_dark,
      paddingTop:65,
    },
    bg: {
      width: GlobalConstants.deviceScreen.width,
      backgroundColor:GlobalConstants.colors.gray_dark,
      flex:1,
    },
    qtTitle:{
      width:GlobalConstants.deviceScreen.width * .95,
      height:GlobalConstants.deviceScreen.width * .2,
      resizeMode:'contain'
    },
    title:{
      fontSize:30,
      color:GlobalConstants.colors.qtColor,
      alignItems:'center',
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:.75,
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
      paddingTop:7,
      paddingBottom:7,
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
      color: '#FFF',
      fontSize:16,
    }
})
module.exports = Login;