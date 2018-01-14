(function () {
    var login = angular.module('login', ['ngRoute', 'menu']);

    login.controller('loginController', function($http, $log, $location, $rootScope) {
    	var store = this;
        store.data = {
	    	login: '',
			password: ''
		};
        store.error = '';
		store.login = function() {
		    $http.post('/login', store.data).then(
		        function () {
                    store.error = '';
		        	$rootScope.$broadcast('login');
		            $location.url('/');
				},
				function () {
                    store.error = 'Неправильный логин или пароль!';
                }
			);
		};
		store.register = function () {
			$http.post('/register', store.data).then(
				function () {
					store.error = '';
					store.login();
                }, function () {
				    store.error = 'Логин занят!';
                }
			);
        };
	});
})();
