(function () {
    var login = angular.module('login', ['ngRoute']);

    login.controller('loginController', function($http, $log, $location) {
        this.data = {
	    	login: '',
			password: ''
		};
		this.login = function() {
		    $http.post('/login', this.data).then(
		        function () {
		            $location.url('/');
				},
				function (err) {
					$log.log(err);
                }
			);
		};
		this.register = function () {
			$http.post('/register', this.data).then(
				function () {
					this.login();
                }, function (err) {
					$log.log(err);
                }
			);
        };
	});
})();
