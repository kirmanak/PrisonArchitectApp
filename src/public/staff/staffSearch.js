(function () {
    const search = angular.module('staffSearch', ['ui-notification', 'ngMaterial']);

    search.controller('staffSearchCtrl', function ($http, $log, $scope, Notification) {
        const showSuccess = function (message) { Notification.success({ message: message, delay: 3000}); };
        const showInfo = function (message) { Notification.info({ message: message, delay: 1000}); };
        const clientError = function (message) { Notification.error({ message: message, delay: 1000}); };
        const serverError = function (error) {
            $log.error(error);
            Notification.error({ message: 'Что-то пошло не так...', delay: 5000});
        };

        $scope.query = {};
        $scope.results = [];
        $scope.appointments = [];
        $scope.offices = [];

        $scope.searchStaff = function () {
            showInfo('Выполняю поиск...');
            $http.post('/staff/search', {
                fullname:
                    $scope.data.surname + ' ' +
                    $scope.data.name + ' ' +
                    $scope.data.patronymic,
            }).then(function (res) {
                $scope.results = res.data;
                showSuccess('Найдено ' + res.data.length + ' записей');
            }, serverError);
        };

        $scope.update = function (staff) {
            $http.patch('/staff', {
                id: staff.id,
                appointment_fk: staff.appointment_fk,
                office_fk: staff.office_fk,
            }).then(function (res) {
                showSuccess('Данные успешно обновлены');
                $scope.searchStaff();
            }, serverError);
        };

        $scope.delete = function (staff) {
            $http.post('/staff', { id: staff.id }).then(function (res) {
                showSuccess('Запись успешно удалена');
                $scope.searchStaff();
            }, serverError);
        };

        $http.get('/staff/offices').then(function (res) {
            $scope.offices = res.data;
        }, serverError);

        $http.get('/staff/appointments').then(function (res) {
            $scope.appointments = res.data;
        }, serverError);
    });
}) ();
