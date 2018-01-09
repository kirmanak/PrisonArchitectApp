(function () {
	var login = angular.module('login', []);

	login.directive('login', function() {
		return {
    		restrict: 'E',
    		templateUrl: 'login/login.html',
    		controller: 'loginController',
    		controllerAs: 'login'
    	};
	});

	login.controller('loginController', [function() {
	}]);
})();
