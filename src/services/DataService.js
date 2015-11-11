var React = require('react-native');

var{
  AlertIOS,
} = React;

var DataConstants = require('../constants/DataConstants');
var Q = require('q');
var {
  	ALERT_URL,
 	CHAIN_URL,
 	SCAN_URL,
 	WATCHLIST_URL,
 	WATCHLIST_TICKER_URL,
 	WATCHLIST_CONTRACT_URL,
} = DataConstants;

var querystring = require('querystring');
var LoginActions = require ('../actions/LoginActions');
var NavBar = require('../components/NavBar');

var LocalStorage = require('../stores/LocalStorage');
var LoginStore = require('../stores/LoginStore');

class DataService{
	do_request(type, path, query_params, accept){
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

	getGraph(contract_symbol){
		console.log('fetching graphs');
		var deferred = Q.defer();
		var jwt = LoginStore.get_jwt();

		//console.log(url);
		console.log(jwt);

		//console.log(url);

		//console.log(query_params);

    	/*var body = querystring.stringify({
                'body': body,
           });*/

		var query_params;
	    
	    var Obj = {
	      method: "GET",
	      headers: {
	      	'Accept': 'image/png',
        	'Content-Type': 'application/x-www-form-urlencoded',
	        'Authorization': jwt,
	      },
	      body:query_params
    	};

    	console.log(Obj);

	    fetch(CHAIN_URL + 'graph/' + contract_symbol + '?height=400&width=350&jwt=', Obj).then(function (res) {
	      console.log("making authenticated request");
	      /*res.json().then(function(data){
	      	 deferred.resolve(data);
	      })*/

	    deferred.resolve(res);
	     
	    });

		return deferred.promise;
	}

	getHits(){
		console.log("getting hits");
		var deferred = Q.defer();
		this.do_request("GET", ALERT_URL+'new').then(function(data){
			console.log("stack of cards" + data);
			deferred.resolve(data);
		});
		console.log("Retrieving stack");

		return deferred.promise;
	}

	getWatchlist(){
		var deferred = Q.defer();
		this.do_request("GET", WATCHLIST_URL).then(function(data){
			console.log("getting watchlist" + data);
			// getting the watchlist needs to do a join on the hits table for scan names
			// and append that onto to the object this function is resolved with
			deferred.resolve(data);
		});

		console.log("Retrieving watchlist");
		return deferred.promise;
	}



	getWatchlistHits(ticker){
		var deferred = Q.defer();
		var URL = WATCHLIST_CONTRACT_URL + "hits/" + ticker;
		this.do_request("GET", URL).then(function(data){
			console.log("fetched the watchlist hit")
			deferred.resolve(data);
		})


		return deferred.promise;

	}

	addToWatchlist(contract){
		var stringified_contract = querystring.stringify({
			'contract' : contract.contract_symbol,
			'ticker' : contract.ticker,
			'bid' : contract.bid,
			'ask' : contract.ask,

		});
		
		var deferred = Q.defer();
		this.do_request("PUT", WATCHLIST_URL, stringified_contract).then(function(data){
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

		console.log("made stringified_hit");

		console.log(WATCHLIST_CONTRACT_URL+'hits');

		this.do_request("PUT", WATCHLIST_CONTRACT_URL+'hits', stringified_hit).then(function(data){
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
		this.do_request("PUT", ALERT_URL, stringified_hit_id).then(function(data){
			console.log("marked " + hit_id + " as seen");
			deferred.resolve();
		})

		return deferred.promise;
	}

	deleteContractFromWatchlist(contract){
		var deferred = Q.defer()
		var DELETE_CONTRACT_URL = WATCHLIST_CONTRACT_URL + contract;
		this.do_request("DELETE", DELETE_CONTRACT_URL ).then(function(data){
			console.log("got the filter list");
			console.log(data);
			deferred.resolve(data);
		})

		return deferred.promise;
	}

	deleteTickerFromWatchlist(ticker){
		var deferred = Q.defer()

		var DELETE_TICKER_URL = WATCHLIST_TICKER_URL + ticker;
		this.do_request("DELETE", DELETE_TICKER_URL ).then(function(data){
			console.log("got the filter list");
			console.log(data);
			deferred.resolve(data);
		})

		return deferred.promise;
	}

	getScanList(){
		var deferred = Q.defer();
		
		this.do_request("GET", SCAN_URL +'/list').then(function(data){
			console.log("got the filter list");
			console.log(data);
			deferred.resolve(data);
		})

		return deferred.promise;
	}

	toggleScanActivation(filter_id){
		var deferred = Q.defer();

		this.do_request("PUT", (SCAN_URL +'activate/' +filter_id) ).then(function(data){
			console.log("Toggling scan activation" + data);
		});

		return deferred.promise;
	}
}

module.exports = new DataService();