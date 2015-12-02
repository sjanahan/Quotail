var sprintf = require('sprintf');

class FormatUtils{
    parseOptionContract(contractSymbol) {
    	//console.log(contractSymbol);
        var optionContractRegex = /\.?([A-Z\-\.\d]+)(\d{2})(\d{2})(\d{2})([PC])(.*)/;
        var opContractstrikeRegex = /(\d{5})(\d{3})/;

        var match = optionContractRegex.exec(contractSymbol);
        if (match && match.length === 7) {

            var strike = match[6];
            if (strike.length === 8) {
                // we have the strike represented as 8 digits where the first 5 are the dollars
                // and the last 3 digits are cents: 00440000
                var strikeMatch = opContractstrikeRegex.exec(strike);
                if (strikeMatch && strikeMatch.length == 3) {
                    var dollars = strikeMatch[1];
                    var cents = strikeMatch[2];
                    strike = dollars + "." + cents;
                }
            }

            return {
                'root_symbol': match[1].toLowerCase(),
                'expiryYear': parseInt('20' + match[2], 10) || match[2],
                'expiryMonth': parseInt(match[3], 10) || match[3],
                'expiryDay': parseInt(match[4], 10) || match[4],
                'type': match[5].toUpperCase(),
                'strike': parseFloat(strike, 10)
            }
        }
    }

    convertCash(amount){
    	var thousand = 1000;
    	var million = 1000000;
    	if (amount < thousand){
    		return amount.toFixed(2);
    	}else if (amount >= thousand && amount < million){
    		return parseInt(amount/thousand) + "K";
    	}else if (amount >= million){
    		return (amount/million).toFixed(1) + "M";
    	}
    }

    normalizeSymbol(symbol){
        var contract = this.parseOptionContract(symbol);
        //console.log(contract);

        var str = "";

     	str += contract.expiryYear + "-" + 
            (contract.expiryMonth < 10 ? "0" + contract.expiryMonth : contract.expiryMonth) + "-" +
            (contract.expiryDay < 10 ? "0" + contract.expiryDay : contract.expiryDay) + " ";
        str += contract.type + " " ;
        str += contract.strike;

        return str;	    
	};

	convertAlertToTitle(alert){
		//console.log(alert);
	    var str = "";
	   
        
        //console.log(contract);
        str += alert.is_sweep ? " Sweep " : " "
        //str += "traded "
        str += (alert.quantity) + "X";
        var bid = parseFloat(alert.bid);
        var ask = parseFloat(alert.ask);
        var price = parseFloat(alert.price);
        if(price < bid){
            str += " BELOW BID ";
        }
        else if(price > ask){
            str += " ABOVE ASK ";
        }
        else if(Math.abs(price - bid) < .0001 ){
            str += " AT BID ";
        }
        else if(Math.abs(price - ask) < .0001 ){
            str += " AT ASK ";
        }
        else if(Math.abs((bid+ask)/2) - price < .0001 ){
            str += " AT MID ";
        }
        else if(Math.abs(price - bid) < Math.abs(price - ask) ){
            str += " NEAR BID ";
        }
        else{
            str += " NEAR ASK ";
        }
        str += "for $" + (this.convertCash(alert.price*alert.quantity*100));
        str += alert.to_open? " to open" : "";

		return str;
    }

	convertAlertToText(alert){
		//console.log(alert);
	    var str = "";
	   
        var contract = this.parseOptionContract(alert.contract_symbol);
        //console.log(contract);

     	str += contract.root_symbol.toUpperCase() + " " + contract.expiryYear + "-" + 
            (contract.expiryMonth < 10 ? "0" + contract.expiryMonth : contract.expiryMonth) + "-" +
            (contract.expiryDay < 10 ? "0" + contract.expiryDay : contract.expiryDay) + " ";
        str += contract.type;
        str += contract.strike;
        str += alert.is_sweep ? " sweep " : " "
        //str += "traded "
        str += (alert.quantity) + "X";
        var bid = parseFloat(alert.bid);
        var ask = parseFloat(alert.ask);
        var price = parseFloat(alert.price);
        if(price < bid){
            str += " BELOW BID ";
        }
        else if(price > ask){
            str += " ABOVE ASK ";
        }
        else if(Math.abs(price - bid) < .0001 ){
            str += " AT BID ";
        }
        else if(Math.abs(price - ask) < .0001 ){
            str += " AT ASK ";
        }
        else if(Math.abs((bid+ask)/2) - price < .0001 ){
            str += " AT MID ";
        }
        else if(Math.abs(price - bid) < Math.abs(price - ask) ){
            str += " NEAR BID ";
        }
        else{
            str += " NEAR ASK ";
        }
        str += "for $" + (this.convertCash(alert.price*alert.quantity*100));
        str += alert.to_open? " to open" : "";

		return str;
    }
		

}




module.exports = new FormatUtils();
