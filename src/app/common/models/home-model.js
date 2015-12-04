'use strict';

angular.module('angularTest')
  .service('HomeService', function ($http, ENDPOINT_URI) {
    var service = this, i, contacts;
    //to create unique contact id
    var uid = 1;
      
    //save method create a new contact if not already exists
    //else update the existing object
    service.save = function (contact) {
        if (contact.id == null) {
            //if this is new contact, add it in contacts array
            contact.id = uid++;
            service.contacts.push(contact);
        } else {
            //for existing contact, find this contact using id
            //and update it.
            for (i in service.contacts) {
                if (contacts[i].id == contact.id) {
                    contacts[i] = contact;
                }
            }
        }
 
    }
 
    //simply search contacts list for given id
    //and returns the contact object if found
    service.get = function (id) {
        for (i in service.contacts) {
            if (service.contacts[i].id == id) {
                return service.contacts[i];
            }
        }
 
    }
     
    //iterate through contacts list and delete 
    //contact if found
    service.delete = function (id) {
        for (i in service.contacts) {
            if (service.contacts[i].id == id) {
                service.contacts.splice(i, 1);
            }
        }
    }
 
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