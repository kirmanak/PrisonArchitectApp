(function () {
    const login = angular.module('login', ['ngRoute', 'ngMaterial', 'ngMessages', 'ui-notification', 'md.data.table']);

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
                    Notification.error({
                        message: 'Неправильный логин или пароль',
                        delay: 2000
                    });
                }
            );
        };
        $scope.register = function () {
            $http.post('/register', {
                username: $scope.data.username,
                password: $scope.data.password
            }).then(function () {
                Notification.success({
                    message: 'Учётная запись создана',
                    delay: 2000
                });
            }, function () {
                Notification.warning({
                    message: 'Логин занят',
                    delay: 2000
                });
            });
        };
    });
}) ();
