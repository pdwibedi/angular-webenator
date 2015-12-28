'use strict';

angular.module('angularTest')
  .controller('HomeCtrl', function ($scope, HomeService) {
    var home = this;
    $scope.currentColor = 'white';
    home.title = 'Doom';
    $scope.sampleText = "fd asfd fadsf dasfdas fadsfsda fsa fasdf asdfas dfdas fadsf asdf dsaf";

    HomeService.all()
    	.then(function(data) {
            $scope.data = data;
    		HomeService.contacts = data.users;
    	})
    	.catch(function() {
    		//
    	})
    	.finally(function() {
    		//
    	})
 
    $scope.saveContact = function (isValid) {
        if($scope.newcontact && isValid) {
        	HomeService.save($scope.newcontact);	
        }
        $scope.newcontact = {};
    }
 
 
    $scope.delete = function (id) {
        HomeService.delete(id);
        if ($scope.newcontact.id == id) $scope.newcontact = {};
    }
 
 
    $scope.edit = function (id) {
        $scope.newcontact = angular.copy(HomeService.get(id));
    }
  })
;
