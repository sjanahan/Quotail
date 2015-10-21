var React = require('react-native');
var {
  AsyncStorage
} = React;

var DEVICE_STORAGE_PREFIX = '@Quotail:';

var _parseString = function(value, type) {
  if (value === null) {
    return null;
  }
  else if (type === "object") {
    return JSON.parse(value);
  }
  else if (type === "boolean") {
    return value === "true"
  }
  else if (type === "number") {
    return parseFloat(value);
  }
  else {
    return value;
  }
};

class LocalStorage {
  constructor(){
    console.log("LocalStorage construction");

  }

  get(key, type) {
    //console.log("GETTING " + key + " " + type);
    //need type to properly parse string.
    return AsyncStorage.getItem(DEVICE_STORAGE_PREFIX + key)
    .then(value => {
      return _parseString(value, type);
    });
  }

  set(key, value) {
    //console.log(key + " " + value);
    var serializedValue = typeof value === "object" ? JSON.stringify(value) : value.toString();

    return AsyncStorage.setItem(DEVICE_STORAGE_PREFIX + key, serializedValue)
  }

  remove(key){
    return AsyncStorage.removeItem(DEVICE_STORAGE_PREFIX + key);
  }

  multiGet(keyMaps) {
    // keyMaps is an array of arrays where each subArray is of the form
    // [key, keyType]. keyType is necessary to parse the string returned
    // from AsyncStorage

    var trueKeys = keyMaps.map((key) => {
      return DEVICE_STORAGE_PREFIX + key[0];
    });

    return AsyncStorage.multiGet(trueKeys)
    .then(rawValues => {
      var values = rawValues.map(([key, value], i) => {
        return [key, _parseString(value, keyMaps[i][1])];
      });
      return values;
    });
  }

  multiSet(rawKvPairs) {
    //need to test
    var kvPairs = rawKvPairs.map(([key, value]) => {
      var serializedValue = typeof value === "object" ? JSON.stringify(value) : value.toString();
      return [DEVICE_STORAGE_PREFIX + key, serializedValue];
    });

    return AsyncStorage.multiSet(kvPairs)
  }
};

module.exports = new LocalStorage();