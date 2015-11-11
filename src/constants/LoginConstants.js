var BASE_URL = 'http://localhost:3009';
var USER_URL =  BASE_URL + '/user/';

var LoginConstants = {
  LOGIN_URL: USER_URL + 'login',
  FORGOT_PASSWORD_URL : USER_URL + 'forgotpassword',
  REGISTER_URL: USER_URL + 'register',
}

module.exports = LoginConstants;