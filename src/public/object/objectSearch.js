(function () {
    const object = angular.module('objectSearch', []);

    object.controller('objectSearchCtrl', function($http, $log, $scope) {
        const errorLog = function (error) {
            $log.error(error);
        };

        $scope.results = [];
        $scope.data = {};
        $scope.types = [];
        $scope.rooms = [];
        $scope.status = '';

        $scope.searchObjects = function() {
            $scope.status = 'Общаемся с сервером...';
            $http.post('/object/search', {
                thing_type_fk: $scope.data.thing_type_fk,
                room_fk: $scope.data.room_fk
            }).then(function (res) {
                $scope.status = 'Результаты поиска перед Вами';
                $scope.results = res.data;
            }, errorLog);
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

        $scope.update = function (object) {
            $http.patch('/object', {
                id: object.id,
                thing_type_fk: object.thing_type_fk,
                room_fk: object.room_fk,
            }).then(function (res) {
                $scope.status = 'Данные успешно обновлены';
                $scope.searchObjects();
            }, errorLog);
        };

        $scope.delete = function (object) {
            $http.post('/object', { id: object.id }).then(function (res) {
                $scope.status = 'Запись успешно удалена';
                $scope.searchObjects();
            }, errorLog);
        };
    });
})();
