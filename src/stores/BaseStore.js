var EventEmitter = require('events').EventEmitter;

class BaseStore extends EventEmitter {

  constructor() {
    super();
    //console.log(BaseStore);
  }

  emitChange() {
    this.emit('CHANGE');
  }

  addChangeListener(cb) {
    console.log("adding a changelistener" );
    console.log(cb);
    this.on('CHANGE', cb)
  }

  removeChangeListener(cb) {
    this.removeListener('CHANGE', cb);
  }
}

module.exports = BaseStore;