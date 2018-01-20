(function () {
    const search = angular.module('roomSearch', ['ui-notification']);

    search.controller('roomSearchCtrl', function ($http, $log, $scope, Notification) {
        const showSuccess = function (message) { Notification.success({ message: message, delay: 3000}); };
        const showInfo = function (message) { Notification.info({ message: message, delay: 1000}); };
        const clientError = function (message) { Notification.error({ message: message, delay: 1000}); };
        const serverError = function (error) {
            $log.error(error);
            Notification.error({ message: 'Что-то пошло не так...', delay: 5000});
        };

        $scope.query = {};
        $scope.accesses = [];
        $scope.results = [];

        $http.get('/room/accesses').then(function (res) {
            $scope.accesses = res.data;
        }, serverError);

        $scope.searchRoom = function () {
            showInfo('Выполняю поиск...');
            $http.post('/room/search', {
                assignment: $scope.query.assignment,
                access_fk: $scope.query.access_fk
            }).then(function (res) {
                $scope.results = res.data;
                showSuccess('Найдено ' + res.data.length + ' записей');
                $log.log($scope.results);
            }, serverError);
        };

        $scope.update = function (room) {
            showInfo('Общаемся с сервером...');
            $http.patch('/room', {
                id: room.id,
                assignment: room.assignment,
                access_fk: room.access_fk,
                area: room.area,
                street: room.street
            }).then(function (res) {
                showSuccess('Данные успешно обновлены');
                $scope.searchRoom();
            }, serverError);
        };

        $scope.delete = function (room) {
            showInfo('Общаемся с сервером...');
            $http.post('/room', { id: room.id }).then(function (res) {
                showSuccess('Запись успешно удалена');
                $scope.searchRoom();
            }, function (error) {
                serverError(error);
                showInfo('Возможно, от этого помещения зависит что-либо (живут заключённые, например).')
            });
        }
    });
}) ();