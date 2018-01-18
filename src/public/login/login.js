(function () {
    const login = angular.module('login', ['ngRoute']);

    login.controller('loginController', function ($http, $scope, $location, $rootScope, $window) {
        $scope.vk = function () {
            $window.location.assign('/vkontakte');
        };
        $scope.data = {};
        $scope.status = '';
        $scope.authorize = function () {
            $http.post('/login', {
                username: $scope.data.username,
                password: $scope.data.password
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
        $scope.register = function () {
            $http.post('/register', {
                username: $scope.data.username,
                password: $scope.data.password
            }).then(function () {
                    $scope.status = '';
                    $scope.login();
                }, function (error) {
                    $scope.status = 'Логин занят!';
                }
            );
        };
    });
})();
