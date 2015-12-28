(function () {
    'use strict';
 
    angular
		.module('angularTest')
		.controller('LoginCtrl', login);
 
	login.$inject = ['$location', 'AuthenticationService', 'FlashService'];
	function login($location, AuthenticationService, FlashService) {
		var vm = this;
        vm.login = login;
 
		(function initController() {
			// reset login status
			AuthenticationService.ClearCredentials();
		})();
 
        function login() {
			vm.dataLoading = true;
			AuthenticationService.Login(vm.username, vm.password)
				.then(function (response) {
					AuthenticationService.SetCredentials(vm.username, vm.password);
					$location.path('/');
				}, function(response){
					FlashService.Error(response.message);
					vm.dataLoading = false;
				});
		};
	}
})();