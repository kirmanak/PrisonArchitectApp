(function () {
    const object = angular.module('object', []);

    object.controller('objectController', function($http, $log, $location, $scope) {
        $scope.data = {};
        $scope.types = [];
        $scope.rooms = [];
        $scope.status = '';

        $scope.sendObject = function() {
            $scope.status = 'Общаемся с сервером...';
            $http.put('/object', {
                thing_type_fk: $scope.data.thing_type_fk,
                room_fk: $scope.data.room_fk
            }).then(function () {
                $scope.status = 'Новый объект успешно добавлен';
                $scope.data = {};
            }, function (error) {
                if (error.status = 403) {
                    $scope.status = 'Вы не авторизованы';
                    $location.url = '/login';
                } else {
                    $scope.status = 'Что-то пошло не так...';
                    $log.error(error);
                }
            });
        };

        $http.get('/object/rooms').then(function (res) {
            $scope.rooms = res.data;
        }, function (error) {
            $scope.status = 'Что-то пошло не так...';
            $log.error(error);
        });

        $http.get('/object/types').then(function (res) {
            $scope.types = res.data;
        }, function (error) {
            $scope.status = 'Что-то пошло не так...';
            $log.error(error);
        });
    });
})();
