(function () {
    var login = angular.module('login', ['ngRoute']);

    login.controller('loginController', function($http, $log, $location) {
    	var store = this;
        store.data = {
	    	login: '',
			password: ''
		};
		store.login = function() {
		    $http.post('/login', store.data).then(
		        function () {
		            $location.url('/');
				},
				function (err) {
					$log.log(err);
                }
			);
		};
		store.register = function () {
			$http.post('/register', store.data).then(
				function () {
					store.login();
                }, function (err) {
					$log.log(err);
                }
			);
        };
	});
})();
