(function () {
    const login = angular.module('login', ['ngRoute']);

    login.controller('loginController', function ($http, $scope, $location, $rootScope, $window) {
        const store = this;
        store.vk = function () {
            $window.location.assign('/vkontakte');
        };
        store.data = {};
        $scope.status = '';
        store.login = function () {
            $http.post('/login', {
                username: store.data.username,
                password: store.data.password
            }).then(
                function () {
                    $scope.status = '';
                    $rootScope.$broadcast('login');
                    $location.url('/');
                },
                function () {
                    $scope.status = 'Неправильный логин или пароль!';
                }
            );
        };
        store.register = function () {
            $http.post('/register', {
                username: store.data.username,
                password: store.data.password
            }).then(function () {
                    $scope.status = '';
                    store.login();
                }, function (error) {
                    $scope.status = 'Логин занят!';
                }
            );
        };
    });
})();
