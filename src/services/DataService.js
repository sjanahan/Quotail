var React = require('react-native');

var{
  AlertIOS,
} = React;

var LoginConstants = require('../constants/LoginConstants');
var Q = require('q');
var {
  BASE_URL,
  GET_CARDS_URL,
  GET_WATCHLIST_URL,
  ADD_TO_WATCHLIST_URL,
  DELETE_FROM_WATCHLIST_URL,
  GET_FILTER_LIST,
} = LoginConstants;

var querystring = require('querystring');
var LoginActions = require ('../actions/LoginActions');
var NavBar = require('../components/NavBar');

var LocalStorage = require('../stores/LocalStorage');
var LoginStore = require('../stores/LoginStore');

class DataService{
	do_request(type, path){
		var deferred = Q.defer();
		var url = path;
		var jwt = LoginStore.get_jwt();

		console.log(url);
		console.log(jwt);
	    
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
	      //console.log(res);
	      res.json().then(function(data){
	        deferred.resolve(data);
	      });
	    });

	    return deferred.promise;
	}

	getHits(){
		var deferred = Q.defer();
		this.do_request("GET", GET_CARDS_URL).then(function(data){
			console.log("stack of cards" + data);
			deferred.resolve(data);
		});
		console.log("Retrieving stack");

		return deferred.promise;
	}

	getWatchlist(){
		var deferred = Q.defer();
		this.do_request("GET", GET_WATCHLIST_URL).then(function(data){
			console.log("getting watchlist" + data);
			deferred.resolve(data);
		})
		console.log("Retrieving watchlist");
		return deferred.promise;
	}

	addToWatchlist(underyling_symbol){
		var deferred = Q.defer();
		var path = ADD_TO_WATCHLIST_URL + "/" + underyling_symbol;
		
		this.do_request("PUT", path).then(function(data){
			console.log ("added  "+ underyling_symbol + "to watchlist");
			deferred.resolve();
		});


		console.log("Adding to watchlist");
		return deferred.promise;
	}

	tailTrade(underyling_symbol){
		
	}

	deleteFromWatchlist(){
		var deferred = Q.defer()
		var path = "/filters/"
		do_request("DELETE", path);
		console.log("Adding to watchlist");

		return deferred.promise;
	}

	getFilters(){
		var deferred = Q.defer();
		
		this.do_request("GET", GET_FILTER_LIST).then(function(data){
			console.log("got the filter list");
			console.log(data);
			deferred.resolve(data);
		})

		return deferred.promise;
	}



	activateFilter(id){
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