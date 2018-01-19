(function () {
    const contraband = angular.module('contrabandSearch', []);

    contraband.controller('contrabandSearchCtrl', function($http, $log, $scope) {
        const errorLog = function (error) {
            $log.error(error);
        };

        $scope.data = {};
        $scope.results = [];
        $scope.prisoners = [];
        $scope.staff = [];
        $scope.objects = [];
        $scope.status = '';

        $scope.searchContraband = function() {
            $scope.status = 'Общаемся с сервером...';
            $http.post('/contraband/search', {
                owner_fk: $scope.data.owner_fk
            }).then(function (res) {
                $scope.status = 'Результаты поиска перед Вами';
                $scope.results = res.data;
            }, errorLog);
        };

        $http.get('/contraband/prisoners').then(function (res) {
            $scope.prisoners = res.data;
        }, errorLog);

        $http.get('/contraband/staff').then(function (res) {
            $scope.types = res.data;
        }, errorLog);

        $http.get('/contraband/objects').then(function (res) {
            $scope.types = res.data;
        }, errorLog);

        $scope.update = function (contraband) {
            $http.patch('/object', {
                id: contraband.id,
                owner_fk: contraband.owner_fk
            }).then(function (res) {
                $scope.status = 'Данные успешно обновлены';
                $scope.searchContraband();
            }, errorLog);
        };

        $scope.delete = function (contraband) {
            $http.post('/contraband', { id: contraband.id }).then(function (res) {
                $scope.status = 'Запись успешно удалена';
                $scope.searchContraband();
            }, errorLog);
        };
    });
})();
