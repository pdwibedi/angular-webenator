'use strict';

angular.module('angularTest')
  .service('EditService', function ($http, ENDPOINT_URI) {
    var service = this, i, contacts;
    //to create unique contact id
    var uid = 1;
      
    //simply returns the contacts list
    service.list = function () {
        return service.contacts;
    }


    service.extract = function(result) {
    	return result.data;
    }

    service.getURL = function() {
    	return ENDPOINT_URI + "assets/json/users.json";
    }

    //simply returns the contacts list
    service.all = function () {
        return $http.get(service.getURL()).then(service.extract);
    }

  });