var _router = null;
class  RouterContainer {
  set(router) {
   _router = router;
  }
  
  get() {
  	console.log("getting the router container");
  	return _router;
  }
}

module.exports = new RouterContainer();