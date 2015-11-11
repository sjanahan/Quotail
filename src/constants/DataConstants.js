var BASE_URL = 'http://localhost:3009';
var AUTH_URL = BASE_URL + '/api'

var LoginConstants = {
  ALERT_URL: AUTH_URL + '/alert/',
  CHAIN_URL: AUTH_URL + '/chain/',
  SCAN_URL: AUTH_URL + '/scan/',
  WATCHLIST_URL : AUTH_URL +'/watchlist/',
  WATCHLIST_TICKER_URL : AUTH_URL + '/watchlist/ticker/',
  WATCHLIST_CONTRACT_URL : AUTH_URL + '/watchlist/contract/',

}

module.exports = LoginConstants;