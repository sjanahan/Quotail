'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var AuthService = require('./services/AuthService');

var Home = require('./Home');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
} = React;

var Login = React.createClass({
  getInitialState: function() {
    return {
      username: 'janahansivaraman@gmail.com',
      password: 'i9u8y7t6'
    }
  },

  signin: function() {
  	AuthService.login(this.state.username, this.state.password);
  },

  forgotpw: function(){
    AuthService.forgotPassword();
  },

  signUp: function(){
    AuthService.signUp();
  },

  render: function() {
    return (
        <View style={styles.container}>
            <Image style={styles.bg}/>
            <View style={styles.header}>
                <Image style={styles.mark} source={require('image!Quotail')} />
            </View>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
                    <TextInput 
                        style={[styles.input, styles.whiteFont]}
                        placeholder="E-mail"
                        placeholderTextColor="#FFF"
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
                        onChangeText={(text) => this.setState({password:text})}
                    />
                </View>
                <TouchableHighlight underlayColor='transparent' onPress={ this.forgotpw }>
                <View style={styles.forgotContainer}>
                    <Text style={styles.greyFont}>Forgot Password</Text>
                </View>
                </TouchableHighlight>
            </View>
            
            <TouchableHighlight underlayColor='transparent' onPress={this.signin}>
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
  }
});
var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height,
        backgroundColor:'#151B20'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#00a4b5',
        padding: 20,
        alignItems: 'center'
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
module.exports = Login;