(function () {
	'use strict';
 
	angular
		.module('angularTest')
		.controller('RegisterCtrl', register);
 
	register.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
	function register(UserService, $location, $rootScope, FlashService) {
		var vm = this;
 
		vm.register = register;
		
		function register() {
			vm.dataLoading = true;
			UserService.Create(vm.user)
				.then(function (response) {
					FlashService.Success('Registration successful', true);
					$location.path('/login');
				}, function(response){
					FlashService.Error(response.data);
					vm.dataLoading = false;
				});
		}
	}
})();