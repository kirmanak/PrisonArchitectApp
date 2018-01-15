(function () {
    var login = angular.module('login', ['ngRoute', 'menu']);

    login.controller('loginController', function($http, $log, $location, $rootScope) {
    	var store = this;
        store.data = {
	    	login: '',
			password: ''
		};
        store.status = '';
		store.login = function() {
		    $http.post('/login', store.data).then(
		        function () {
                    store.status = '';
		        	$rootScope.$broadcast('login');
		            $location.url('/');
				},
				function () {
                    store.status = 'Неправильный логин или пароль!';
                }
			);
		};
		store.register = function () {
			$http.post('/register', store.data).then(
				function () {
					store.status = '';
					store.login();
                }, function () {
				    store.status = 'Логин занят!';
                }
			);
        };
	});
})();
