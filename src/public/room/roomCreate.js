(function () {
    const room = angular.module('room', ['ui-notification']);

    room.controller('roomCreate', function ($http, $log, $scope, Notification) {
        const showSuccess = function (message) { Notification.success({ message: message, delay: 3000}); };
        const showInfo = function (message) { Notification.info({ message: message, delay: 1000}); };
        const clientError = function (message) { Notification.error({ message: message, delay: 1000}); };
        const serverError = function (error) {
            $log.error(error);
            Notification.error({ message: 'Что-то пошло не так...', delay: 5000});
        };

        $scope.data = {};
        $scope.accesses = [];
        $http.get('/room/accesses').then(function (res) {
            $scope.accesses = res.data;
        }, serverError);
        $scope.sendRoom = function () {
            $http.put('/room', {
                assignment: $scope.data.assignment,
                access_fk: $scope.data.access_fk,
                area: $scope.data.area,
                // StackOverflow way to parse boolean
                street: $scope.data.street === 'true'
            }).then(function (res) {
                showSuccess('Успешно добавлено новое помещение!');
                $scope.data = {};
            }, serverError);
        }
    });
}) ();