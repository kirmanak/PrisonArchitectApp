(function () {
    const search = angular.module('roomSearch', []);

    search.controller('roomSearchCtrl', function ($http, $log, $scope) {
        const errorLog = function (error) {
            $log.error(error);
        };

        $scope.query = {};
        $scope.accesses = [];
        $scope.results = [];
        $scope.status = '';

        $http.get('/room/accesses').then(function (res) {
            $scope.accesses = res.data;
        }, errorLog);

        $scope.searchRoom = function () {
            $scope.status = 'Выполняю поиск...';
            $http.post('/room/search', {
                assignment: $scope.query.assignment,
                access_fk: $scope.query.access_fk
            }).then(function (res) {
                $scope.results = res.data;
                $scope.status = 'Результаты поиска перед Вами';
            }, errorLog);
        };

        $scope.update = function (room) {
            $http.patch('/room', {
                id: room.id,
                assignment: room.assignment,
                access_fk: room.access_fk,
                area: room.area,
                street: room.street === 'true'
            }).then(function (res) {
                $scope.status = 'Данные успешно обновлены';
                $scope.searchRoom();
            }, errorLog);
        };

        $scope.delete = function (room) {
            $http.post('/room', { id: room.id }).then(function (res) {
                $scope.status = 'Запись успешно удалена';
                $scope.searchRoom();
            }, function (error) {
                errorLog(error);
                $scope.status = 'Кажется, в этом помещении происходит что-то важное. Возможно, проходит программа или живут люди.'
            });
        }
    });
}) ();