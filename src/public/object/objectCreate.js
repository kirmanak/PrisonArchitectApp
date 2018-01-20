(function () {
    const object = angular.module('object', ['ui-notification']);

    object.controller('objectController', function($http, $log, $location, $scope, Notification) {
        const showSuccess = function (message) {
            Notification.success({ message: message, delay: 3000});
        };

        const showInfo = function (message) {
            Notification.info({ message: message, delay: 1000});
        };

        const clientError = function (message) {
            Notification.error({ message: message, delay: 1000});
        };

        const serverError = function (error) {
            $log.error(error);
            Notification.error({ message: 'Что-то пошло не так...', delay: 5000});
        };

        $scope.data = {};
        $scope.types = [];
        $scope.rooms = [];

        $scope.sendObject = function() {
            showInfo('Общаемся с сервером');
            $http.put('/object', {
                thing_type_fk: $scope.data.thing_type_fk,
                room_fk: $scope.data.room_fk
            }).then(function () {
                showSuccess('Новый объект успешно добавлен');
                $scope.data = {};
            }, function (error) {
                if (error.status = 403) {
                    clientError('Вы не авторизованы');
                    $location.url = '/login';
                } else {
                    serverError(error);
                }
            });
        };

        $http.get('/object/rooms').then(function (res) {
            $scope.rooms = res.data;
        }, serverError);

        $http.get('/object/types').then(function (res) {
            $scope.types = res.data;
        }, serverError);
    });
})();
