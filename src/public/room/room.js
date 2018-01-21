(function () {
    const room = angular.module('room', ['ui-notification', 'ngMaterial', 'ngMessages', 'md.data.table']);

    room.controller('roomCtrl', function ($http, $log, $scope, Notification) {
        const showSuccess = function (message) { Notification.success({ message: message, delay: 3000}); };
        const showInfo = function (message) { Notification.info({ message: message, delay: 1000}); };
        const clientError = function (message) { Notification.error({ message: message, delay: 1000}); };
        const serverError = function (error) {
            $log.error(error);
            Notification.error({ message: 'Что-то пошло не так...', delay: 5000});
        };

        $scope.data = {};
        $scope.accesses = [];
        $scope.query = {};
        $scope.results = [];

        $scope.sendRoom = function () {
            $http.put('/room', {
                assignment: $scope.data.assignment,
                access_fk: $scope.data.access_fk,
                area: $scope.data.area,
                // StackOverflow way to parse boolean
                street: $scope.data.street
            }).then(function (res) {
                showSuccess('Успешно добавлено новое помещение!');
                $scope.data = {};
                $scope.createForm.$setPristine();
                $scope.createForm.$setUntouched();
            }, serverError);
        };

        $scope.loadAccesses = function () {
            return new Promise(function (resolve, reject) {
                $http.get('/room/accesses').then(function (res) {
                    $scope.accesses = res.data;
                    resolve();
                }, function (error) {
                    serverError(error);
                    reject();
                });
            });
        };

        $scope.searchRoom = function () {
            showInfo('Выполняю поиск...');
            $http.post('/room/search', {
                assignment: $scope.query.assignment,
                access_fk: $scope.query.access_fk
            }).then(function (res) {
                $scope.results = res.data;
                $scope.query = {};
                $scope.searchForm.$setPristine();
                $scope.searchForm.$setUntouched();
                $scope.loadAccesses().then(function () {
                    showSuccess('Найдено ' + res.data.length + ' записей');
                }, serverError);
            }, serverError);
        };

        $scope.update = function (room) {
            showInfo('Общаемся с сервером...');
            $http.patch('/room', {
                id: room.id,
                assignment: room.assignment,
                access_fk: room.access_fk
            }).then(function (res) {
                showSuccess('Данные успешно обновлены');
            }, serverError);
        };

        $scope.delete = function (room, index) {
            showInfo('Общаемся с сервером...');
            $http.post('/room', { id: room.id }).then(function (res) {
                showSuccess('Запись успешно удалена');
                $scope.results.splice(index, 1);
            }, function (error) {
                serverError(error);
                showInfo('Возможно, от этого помещения зависит что-либо (живут заключённые, например).')
            });
        };
    });
}) ();
