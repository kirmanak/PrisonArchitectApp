(function () {
    const search = angular.module('staffSearch', []);

    search.controller('staffSearchCtrl', function ($http, $log, $scope) {
        const errorLog = function (error) {
            $log.error(error);
        };

        $scope.query = {};
        $scope.results = [];
        $scope.status = '';
        $scope.appointments = [];
        $scope.offices = [];

        $scope.searchStaff = function () {
            $scope.status = 'Выполняю поиск...';
            $http.post('/staff/search', {
                fullname:
                    $scope.data.surname + ' ' +
                    $scope.data.name + ' ' +
                    $scope.data.patronymic,
            }).then(function (res) {
                $scope.results = res.data;
                $scope.status = 'Результаты поиска перед Вами';
            }, errorLog);
        };

        $scope.update = function (staff) {
            $http.patch('/staff', {
                id: staff.id,
                appointment_fk: staff.appointment_fk,
                office_fk: staff.office_fk,
            }).then(function (res) {
                $scope.status = 'Данные успешно обновлены';
                $scope.searchStaff();
            }, errorLog);
        };

        $scope.delete = function (staff) {
            $http.post('/staff', { id: staff.id }).then(function (res) {
                $scope.status = 'Запись успешно удалена';
                $scope.searchStaff();
            }, errorLog);
        };

        $http.get('/staff/offices').then(function (res) {
            $scope.offices = res.data;
        }, errorLog);

        $http.get('/staff/appointments').then(function (res) {
            $scope.appointments = res.data;
        }, errorLog);
    });
}) ();
