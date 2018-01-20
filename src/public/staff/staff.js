(function () {
    const staff = angular.module('staff', ['ngMaterial', 'ngMessages', 'md.data.table']);

    staff.controller('staffCtrl', function ($http, $log, $location, $scope, $mdToast) {
        const showSuccess = function (message) {
            $mdToast.show($mdToast.simple()
                .textContent(message)
                .position('top right')
                .hideDelay(3000));
        };
        const showInfo = function (message) {
            $mdToast.show($mdToast.simple()
                .textContent(message)
                .position('top right')
                .hideDelay(1000));
        };
        const clientError = function (message) {
            $mdToast.show($mdToast.simple()
                .textContent(message)
                .position('top right')
                .hideDelay(1000));
        };
        const serverError = function (error) {
            $log.error(error);
            $mdToast.show($mdToast.simple()
                .textContent(message)
                .position('top right')
                .hideDelay(5000));
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
