var BASE_URL = 'http://localhost:3009';
var LoginConstants = {
  BASE_URL: BASE_URL,
  LOGIN_URL: BASE_URL + '/user/login',
  SIGNUP_URL: BASE_URL + '/user/register',
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  FORGOT_PASSWORD_URL: BASE_URL + '/user/forgotpassword',
  REGISTER_URL: BASE_URL + '/user/mobile_register'

}

module.exports = LoginConstants;