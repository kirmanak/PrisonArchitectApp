(function () {
    var room = angular.module('room', []);

    room.controller('roomCreate', function ($http, $log, $scope) {
        const errorLog = function (error) { $log.log(error); };

        $scope.data = {};
        $scope.accesses = [];
        $scope.status = '';
        $http.get('/room/accesses').then(function (res) {
            $scope.accesses = res.data;
        }, errorLog);
        $scope.send = function () {
            $http.post('/room', {
                assignment: $scope.data.assignment,
                access_fk: $scope.data.access_fk,
                area: $scope.data.area,
                // StackOverflow way to parse boolean
                street: $scope.data.street === 'true'
            }).then(function (res) {
                $scope.status = 'Успешно добавлено новое помещение!';
                $scope.data = {};
            }, errorLog);
        }
    });
}) ();