(function () {
    const login = angular.module('login', ['ngRoute']);

    login.controller('loginController', function ($http, $log, $location, $rootScope, $window) {
        const store = this;
        store.vk = function () {
            $window.location.assign('/vkontakte');
        };
        store.data = {};
        store.status = '';
        store.login = function () {
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
