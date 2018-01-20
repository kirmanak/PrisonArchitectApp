(function () {
    const contraband = angular.module('contrabandSearch', ['ui-notification']);

    contraband.controller('contrabandSearchCtrl', function($http, $log, $scope, Notification) {
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

        $scope.data = {};
        $scope.results = [];
        $scope.prisoners = [];

        $scope.searchContraband = function() {
            showInfo('Общаемся с сервером...');
            $http.post('/contraband/search', {
                owner_fk: $scope.data.owner_fk
            }).then(function (res) {
                showSuccess('Найдено ' + res.data.length + ' записей');
                $scope.results = res.data;
            }, serverError);
        };

        $http.get('/contraband/prisoners').then(function (res) {
            $scope.prisoners = res.data;
        }, serverError);

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
                $scope.searchContraband();
            }, serverError);
        };

        $scope.delete = function (contraband) {
            showInfo('Общаемся с сервером...');
            $http.post('/contraband', { id: contraband.id }).then(function () {
                Notification.success({ message: 'Запись успешно удалена', delay: 3000});
                $scope.searchContraband();
            }, serverError);
        };
    });
})();
