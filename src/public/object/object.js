(function () {
    const object = angular.module('object', ['ui-notification', 'ngMaterial', 'ngMessages', 'md.data.table']);

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
        $scope.results = [];
        $scope.query = {};

        $scope.searchObjects = function() {
            showInfo('Общаемся с сервером...');
            $http.post('/object/search', {
                thing_type_fk: $scope.query.thing_type_fk,
                room_fk: $scope.query.room_fk
            }).then(function (res) {
                $scope.results = res.data;
                $scope.query = {};
                $scope.searchForm.$setPristine();
                $scope.searchForm.$setUntouched();
                const promises = [];
                promises.push($scope.loadRooms());
                promises.push($scope.loadTypes());
                Promise.all(promises).then(function () {
                    showSuccess('Найдено ' + res.data.length + ' записей');
                }, serverError);
            }, serverError);
        };

        $scope.loadRooms = function() {
            return new Promise(function (resolve, reject) {
                $http.get('/object/rooms').then(function (res) {
                    $scope.rooms = res.data;
                    resolve();
                }, function (error) {
                    serverError(error);
                    reject();
                });
            });
        };

        $scope.loadTypes = function() {
            return new Promise(function (resolve, reject) {
                $http.get('/object/types').then(function (res) {
                    $scope.types = res.data;
                    resolve();
                }, function (error) {
                    serverError(error);
                    reject();
                });
            });
        };

        $scope.update = function (object) {
            showInfo('Общаемся с сервером...');
            $http.patch('/object', {
                id: object.id,
                thing_type_fk: object.thing_type_fk,
                room_fk: object.room_fk,
            }).then(function (res) {
                showSuccess('Данные успешно обновлены');
            }, serverError);
        };

        $scope.delete = function (object, index) {
            showInfo('Общаемся с сервером...');
            $http.post('/object', { id: object.id }).then(function (res) {
                showSuccess('Запись успешно удалена');
                $scope.results.splice(index, 1);
            }, serverError);
        };

        $scope.sendObject = function() {
            showInfo('Общаемся с сервером');
            $http.put('/object', {
                thing_type_fk: $scope.data.thing_type_fk,
                room_fk: $scope.data.room_fk
            }).then(function () {
                showSuccess('Новый объект успешно добавлен');
                $scope.data = {};
                $scope.createForm.$setPristine();
                $scope.createForm.$setUntouched();
            }, function (error) {
                if (error.status = 403) {
                    clientError('Вы не авторизованы');
                    $location.url = '/login';
                } else {
                    serverError(error);
                }
            });
        };
    });
})();
