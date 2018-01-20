(function () {
    const login = angular.module('login', ['ngRoute', 'ui-notification']);

    login.controller('loginController', function ($http, $scope, $location, $rootScope, $window, Notification) {
        $scope.vk = function () {
            $window.location.assign('/vkontakte');
        };
        $scope.data = {};
        $scope.authorize = function () {
            $http.post('/login', {
                username: $scope.data.username,
                password: $scope.data.password
            }).then(
                function () {
                    $rootScope.$broadcast('login');
                    $location.url('/');
                },
                function () {
                    Notification.error({message: 'Неправильный логин или пароль!', delay: 1000})
                }
            );
        };
        $scope.register = function () {
            $http.post('/register', {
                username: $scope.data.username,
                password: $scope.data.password
            }).then(function () {
                $scope.login();
            }, function () {
                Notification.error({message: 'Логин занят!', delay: 1000});
            });
        };
    });
}) ();
