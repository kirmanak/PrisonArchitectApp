(function () {
    const contraband = angular.module('contraband', []);

    contraband.controller('contrabandController', function($http, $log, $location, $scope) {
        const errorLog = function (error) {
            $log.error(error);
        };

        $scope.data = {};
        $scope.staff = [];
        $scope.prisoners = [];
        $scope.objects = [];
        $scope.status = '';

        $scope.sendContraband = function() {
            $scope.status = 'Общаемся с сервером...';
            $http.put('/contraband', {
                object_fk: $scope.data.object_fk,
                owner_fk: $scope.data.owner_fk,
                discovered_by_fk: $scope.data.discovered_by_fk,
                discovered_on: $scope.data.discovered_on
            }).then(function () {
                $scope.status = 'Новая запись успешно добавлена';
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

        $http.get('/contraband/objects').then(function (res) {
            $scope.objects = res.data;
        }, function (error) {
            $scope.status = 'Что-то пошло не так...';
            $log.error(error);
        });

        $http.get('/contraband/prisoners').then(function (res) {
            $scope.prisoners = res.data;
        }, function (error) {
            $scope.status = 'Что-то пошло не так...';
            $log.error(error);
        });

        $http.get('/contraband/staff').then(function (res) {
            $scope.staff = res.data;
        }, function (error) {
            $scope.status = 'Что-то пошло не так...';
            $log.error(error);
        });
    });
})();
