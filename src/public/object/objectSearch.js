(function () {
    const object = angular.module('objectSearch', ['ui-notification']);

    object.controller('objectSearchCtrl', function($http, $log, $scope, Notification) {
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

        $scope.results = [];
        $scope.data = {};
        $scope.types = [];
        $scope.rooms = [];

        $scope.searchObjects = function() {
            showInfo('Общаемся с сервером...');
            $http.post('/object/search', {
                thing_type_fk: $scope.data.thing_type_fk,
                room_fk: $scope.data.room_fk
            }).then(function (res) {
                showSuccess('Найдено ' + res.data.length + ' записей');
                $scope.results = res.data;
            }, serverError);
        };

        $http.get('/object/rooms').then(function (res) {
            $scope.rooms = res.data;
        }, serverError);

        $http.get('/object/types').then(function (res) {
            $scope.types = res.data;
        }, serverError);

        $scope.update = function (object) {
            showInfo('Общаемся с сервером...');
            $http.patch('/object', {
                id: object.id,
                thing_type_fk: object.thing_type_fk,
                room_fk: object.room_fk,
            }).then(function (res) {
                showSuccess('Данные успешно обновлены');
                $scope.searchObjects();
            }, serverError);
        };

        $scope.delete = function (object) {
            showInfo('Общаемся с сервером...');
            $http.post('/object', { id: object.id }).then(function (res) {
                showSuccess('Запись успешно удалена');
                $scope.searchObjects();
            }, serverError);
        };
    });
})();
