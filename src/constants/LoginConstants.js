var BASE_URL = 'http://localhost:3009';
var LoginConstants = {
  BASE_URL: BASE_URL,
  LOGIN_URL: BASE_URL + '/user/login',
  SIGNUP_URL: BASE_URL + '/user/register',
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  FORGOT_PASSWORD_URL: BASE_URL + '/user/forgotpassword',
  REGISTER_URL: BASE_URL + '/user/mobile_register',
  GET_CARDS_URL: BASE_URL + '/api/filter/mobile_alerts',
  GET_WATCHLIST_URL: BASE_URL + '/api/watchlist',
  ADD_TO_WATCHLIST_URL: BASE_URL+ '/api/watchlist',
  DELETE_FROM_WATCHLIST_URL: BASE_URL + '/api/watchlist',
  GET_FILTER_LIST: BASE_URL + '/api/filter/list',
}

module.exports = LoginConstants;