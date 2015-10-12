var React = require('react-native');

var{
  AlertIOS
} = React;

var LoginConstants = require('../constants/LoginConstants');
var {
  BASE_URL
} = LoginConstants;

var querystring = require('querystring');
var LoginActions = require ('../actions/LoginAction');
var Home = require('../Home');

var LocalStorage = require('../stores/LocalStorage');
var LoginStore = require('../stores/LoginStore');

class DataService{
	do_request(type, path){
		var url = BASE_URL + path;
		var jwt = LoginStore.get_jwt();
	    
	    var Obj = {
	      method: type,
	      headers: {
	        'accept': 'application/json',
	        'content-Type' : 'application/json',
	        'Authorization': jwt,
	      }
    	};


	    fetch(url, Obj).then(function (res) {
	      console.log("making authenticated request");
	      console.log(res);
	      res.json().then(function(data){
	        console.log(data);
	      });
	    });
	}

	getStackOfCards(){
		var path = "/api/filter/mobile_alerts"
		do_request("GET", path);
		console.log("Retrieving stack");
	}

	addToWatchlist(){
		var path = "/filters/"
		do_request("PUT", path);
		console.log("Adding to watchlist");

	}

	deleteFromWatchlist(){
		var path = "/filters/"
		do_request("PUT", path);
		console.log("Adding to watchlist");
	}

	activateFilter(){
		var path = "/filters/"
		do_request("PUT", path);
		console.log("Activating Filter");
	}

	deactivateFilter(){
		var path = "/filters/"
		do_request("PUT", path);
		console.log("De-activating Filter");
	}
}

module.exports = new DataService();