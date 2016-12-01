var APIARY_URL = 'http://private-b3d005-hackdayreactnative.apiary-mock.com/';
var BASE_URL = APIARY_URL;

var HEADERS = {'Accept': 'application/json', 'Content-Type': 'application/json'};

class RestApi {
  constructor() {
  }

  // Obtain data from API
  _getCollectionsData(callback) {
    var apiPath = BASE_URL.concat('collect_data');
    return fetch(apiPath, {
        method: 'GET',
        headers: HEADERS
      })
      .then((response) => response.json())
      .then((responseData) => {
        return callback(responseData, null);
      })
      .catch((error) => {
        console.error(error);
        return callback(null, error);
      })
      .done();
  }
}

export default RestApi;
