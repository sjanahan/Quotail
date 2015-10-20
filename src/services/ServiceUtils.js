class ServiceUtils{
  parseJSON(response) {
  	console.log("parsing json");
    return response.json()
  }

  checkStatus(response) {
  	console.log("checking status");
  	console.log(response);
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      console.log('bad error code');

      var error = new Error(JSON.stringify(JSON.parse(response._bodyText).message));
      //error.response = 
      console.log(error.response);
      throw error;
	 }
  }


	
}


module.exports = new ServiceUtils();