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
	do_request(type, path, query_params){
		var deferred = Q.defer();
		var url = path;
		var jwt = LoginStore.get_jwt();

		console.log(url);
		//console.log(jwt);

		//console.log(url);

		console.log(query_params);

    	/*var body = querystring.stringify({
                'body': body,
           });*/
	    
	    var Obj = {
	      method: type,
	      headers: {
	        'accept': 'application/json',
        	'Content-Type': 'application/x-www-form-urlencoded',
	        'Authorization': jwt,
	      },
	      body:query_params
    	};

    	console.log(Obj);

	    fetch(url, Obj).then(function (res) {
	      console.log("making authenticated request");
	      console.log(res);
	      res.json().then(function(data){
	      	console.log(data);
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
			// getting the watchlist needs to do a join on the hits table for scan names
			// and append that onto to the object this function is resolved with
			deferred.resolve(data);
		});


		console.log("Retrieving watchlist");
		return deferred.promise;
	}

	getNumHitsPerTicker(){
		var deferred = Q.defer();

		var path = BASE_URL + '/api/watchlist/hits/numberOf';


		this.do_request("GET", path).then(function(data){
			console.log("Got the number");
			deferred.resolve(data);
		})

		return deferred.promise;
	}


	getWatchlistHits(ticker){

		var deferred = Q.defer();

		var path = BASE_URL + "/api/watchlist/hits/"+ticker;
		this.do_request("GET", path).then(function(data){
			console.log("fetched the watchlist hit")
			deferred.resolve(data);
		})


		return deferred.promise;

	}

	/*addToWatchlist(underyling_symbol){
		var deferred = Q.defer();
		var path = ADD_TO_WATCHLIST_URL + "/" + underyling_symbol;
		
		this.do_request("PUT", path).then(function(data){
			console.log(data);
			console.log ("added  "+ underyling_symbol + "to watchlist");
			deferred.resolve();
		});


		console.log("Adding to watchlist");
		return deferred.promise;
	}*/

	addToWatchlist(contract){
		var stringified_contract = querystring.stringify({
			'contract' : contract.contract_symbol,
			'ticker' : contract.ticker,
			'bid' : contract.bid,
			'ask' : contract.ask,

		});

		/*var deferred = Q.defer();
		console.log(contract);
		deferred.resolve();*/
		
		var deferred = Q.defer();
		var path = BASE_URL + '/api/watchlist';
		this.do_request("PUT", path, stringified_contract).then(function(data){
			console.log("Adding contract to watchlist" + data);
			deferred.resolve();
		});
		
		return deferred.promise;
	}

	addToWatchlistHits(card){
		console.log("DATA SERVICE ADD TO WATCHLIST HITS");
		console.log(card);
		var deferred = Q.defer();
		var stringified_hit = querystring.stringify({
			'cluster_token' : card.cluster_token,
			'root_symbol' : card.ticker,
			'contract_symbol': card.contract_symbol,
		});

		var path = BASE_URL + "/api/watchlist/hit"

		this.do_request("PUT", path, stringified_hit).then(function(data){
			console.log("adding this sucker to watchlist hits");
			deferred.resolve();
		})
		
		return deferred.promise;
	}

	setAsDelivered(hit_id){
		var stringified_hit_id = querystring.stringify({
			'hit_id': hit_id
		});

		var deferred = Q.defer();
		var path = BASE_URL + "/api/filter/alert_seen";
		this.do_request("PUT", path, stringified_hit_id).then(function(data){
			console.log("marked " + hit_id + " as seen");
			deferred.resolve();
		})

		return deferred.promise;
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



	toggleScanActivation(filter_id){
		var deferred = Q.defer();

		var path = BASE_URL + "/api/filter/activate/" + filter_id;

		this.do_request("PUT", path).then(function(data){
			console.log("Toggling scan activation" + data);
		});

		return deferred.promise;
	}
}

module.exports = new DataService();