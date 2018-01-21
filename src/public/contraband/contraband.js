(function () {
    const contraband = angular.module('contraband', ['ui-notification', 'ngMaterial', 'ngMessages', 'md.data.table']);

    contraband.controller('contrabandCtrl', function($http, $log, $location, $scope, Notification) {
        $scope.maxDate = new Date();
        $scope.data = {};
        $scope.staff = [];
        $scope.prisoners = [];
        $scope.objects = [];
        $scope.query = {};
        $scope.results = [];

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

        $scope.sendContraband = function() {
            showInfo('Общаемся с сервером');
            $http.put('/contraband', {
                object_fk: $scope.data.object_fk,
                owner_fk: $scope.data.owner_fk,
                discovered_by_fk: $scope.data.discovered_by_fk,
                discovered_on: $scope.data.discovered_on
            }).then(function () {
                showSuccess('Новая запись успешно добавлена');
                $scope.data = {};
            }, function (error) {
                if (error.status = 403) {
                    clientError('Вы не авторизованы');
                    $location.url = '/login';
                } else {
                    serverError(error);
                }
            });
        };

        $scope.loadObjects = function() {
            return new Promise(function (resolve, reject) {
                $http.get('/contraband/objects').then(function (res) {
                    $scope.objects = res.data;
                    resolve();
                }, function(error) {
                    serverError(error);
                    reject();
                });
            });
        };

        $scope.loadPrisoners = function() {
            return new Promise(function (resolve, reject) {
                $http.get('/contraband/prisoners').then(function (res) {
                    $scope.prisoners = res.data;
                    resolve();
                }, function(error) {
                    serverError(error);
                    reject();
                });
            });
        };

        $scope.loadStaff = function() {
            return new Promise(function (resolve, reject) {
                $http.get('/contraband/staff').then(function (res) {
                    $scope.staff = res.data;
                    resolve();
                }, function(error) {
                    serverError(error);
                    reject();
                });
            });
        };

        $scope.searchContraband = function() {
            showInfo('Общаемся с сервером...');
            $http.post('/contraband/search', {
                owner_fk: $scope.query.owner_fk
            }).then(function (res) {
                showSuccess('Найдено ' + res.data.length + ' записей');
                $scope.results = res.data;
            }, serverError);
        };


        $scope.update = function (contraband) {
            if (!contraband.owner_fk) {
                clientError('Укажите владельца!');
                return;
            }
            showInfo('Общаемся с сервером...');
            $http.patch('/contraband', {
                id: contraband.id,
                owner_fk: contraband.owner_fk
            }).then(function () {
                showSuccess('Данные успешно обновлены');
            }, serverError);
        };

        $scope.delete = function (contraband, index) {
            showInfo('Общаемся с сервером...');
            $http.post('/contraband', { id: contraband.id }).then(function () {
                Notification.success({ message: 'Запись успешно удалена', delay: 3000});
                $scope.results.splice(index, 1);
            }, serverError);
        };
    });
})();
