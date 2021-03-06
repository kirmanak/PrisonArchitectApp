(function () {
    const staff = angular.module('staff', ['ngMaterial', 'ngMessages', 'md.data.table', 'ui-notification']);

    staff.controller('staffCtrl', function ($http, $log, $location, $scope, Notification) {
        const showSuccess = function (message) {
            Notification.success({
                message: message,
                delay: 3000
            });
        };
        const showInfo = function (message) {
            Notification.info({
                message: message,
                delay: 1000
            });
        };
        const clientError = function (message) {
            Notification.error({
                message: message,
                delay: 1000
            });
        };
        const serverError = function (error) {
            Notification.error({
                message: 'Что-то пошло не так...',
                delay: 1000
            });
            $log.error(error);
        };

        $scope.data = {};
        $scope.appointments = [];
        $scope.offices = [];
        $scope.query = {};
        $scope.results = [];

        $scope.sendStaff = function () {
            showInfo('Общаемся с сервером...');
            $http.put('/staff', {
                fullname:
                $scope.data.surname + ' ' +
                $scope.data.name + ' ' +
                $scope.data.patronymic,
                appointment_fk: $scope.data.appointment_fk,
                office_fk: $scope.data.office_fk
            }).then(function () {
                showSuccess('Новый сотрудник успешно добавлен');
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

        $scope.searchStaff = function () {
            showInfo('Выполняю поиск...');
            $http.post('/staff/search', {
                fullname:
                $scope.query.surname + ' ' +
                $scope.query.name + ' ' +
                $scope.query.patronymic,
            }).then(function (res) {
                $scope.results = res.data;
                $scope.query = {};
                $scope.searchForm.$setPristine();
                $scope.searchForm.$setUntouched();
                const promises = [];
                promises.push($scope.loadAppointments());
                promises.push($scope.loadOffices());
                Promise.all(promises).then(function () {
                    showSuccess('Найдено ' + res.data.length + ' записей');
                }, serverError);
            }, serverError);
        };

        $scope.update = function (staff) {
            $http.patch('/staff', {
                id: staff.id,
                appointment_fk: staff.appointment_fk,
                office_fk: staff.office_fk,
            }).then(function (res) {
                showSuccess('Данные успешно обновлены');
            }, serverError);
        };

        $scope.delete = function (staff, index) {
            $http.post('/staff', { id: staff.id }).then(function (res) {
                showSuccess('Запись успешно удалена');
                $scope.results.splice(index, 1);
            }, serverError);
        };
        $scope.loadOffices = function () {
            return new Promise(function (resolve, reject) {
                $http.get('/staff/offices').then(function (res) {
                    $scope.offices = res.data;
                    resolve();
                }, function (error) {
                    serverError(error);
                    reject();
                });
            });
        };

        $scope.loadAppointments = function () {
            return new Promise(function (resolve, reject) {
                $http.get('/staff/appointments').then(function (res) {
                    $scope.appointments = res.data;
                    resolve();
                }, function (error) {
                    serverError(error);
                    reject();
                });
            });
        };
    });
}) ();
