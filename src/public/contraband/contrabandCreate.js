(function () {
    const contraband = angular.module('contraband', ['ui-notification']);

    contraband.controller('contrabandController', function($http, $log, $location, $scope, Notification) {
        $scope.maxDate = (new Date()).toISOString();
        $scope.data = {};
        $scope.staff = [];
        $scope.prisoners = [];
        $scope.objects = [];

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

        $http.get('/contraband/objects').then(function (res) {
            $scope.objects = res.data;
        }, serverError);

        $http.get('/contraband/prisoners').then(function (res) {
            $scope.prisoners = res.data;
        }, serverError);

        $http.get('/contraband/staff').then(function (res) {
            $scope.staff = res.data;
        }, serverError);
    });
})();
