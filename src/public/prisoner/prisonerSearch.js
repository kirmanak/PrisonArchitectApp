(function () {
    const search = angular.module('prisonerSearch', ['ui-notification']);

    search.controller('prisonerSearchController', function ($log, $http, $scope, Notification) {
        const showSuccess = function (message) { Notification.success({ message: message, delay: 3000}); };
        const showInfo = function (message) { Notification.info({ message: message, delay: 1000}); };
        const clientError = function (message) { Notification.error({ message: message, delay: 1000}); };
        const serverError = function (error) {
            $log.error(error);
            Notification.error({ message: 'Что-то пошло не так...', delay: 5000});
        };

        // variables
        $scope.data = {};
        $scope.results = [];
        $scope.reputations = [];
        $scope.regimes = [];

        $http.get('/prisoner/regimes').then(function (res) {
            $scope.regimes = res.data;
        }, serverError);

        $http.get('/prisoner/reputations').then(function (res) {
            $scope.reputations = res.data;
        }, serverError);

        // calls when regime changes
        $scope.regimeChanged = function (prisoner) {
            $scope.loadPrograms(prisoner);
            $scope.loadWards(prisoner);
        };

        $scope.loadPrograms = function (prisoner) {
            $http.post('/prisoner/programs', {id: prisoner.regime.id}).then(function (res) {
                prisoner.availablePrograms = res.data;
            }, serverError);
        };

        $scope.loadWards = function (prisoner) {
            $http.post('/prisoner/wards', {id: prisoner.regime.id}).then(function (res) {
                prisoner.availableWards = res.data;
            }, serverError);
        };

        $scope.searchPrisoners = function () {
            showInfo('Выполняю поиск...');
            $http.post('/prisoner/search', {
                fullname:
                    $scope.data.surname + ' ' +
                    $scope.data.name + ' ' +
                    $scope.data.patronymic
            }).then(function (res) {
                showSuccess('Найдено ' + res.data.length + ' записей');
                $scope.results = res.data;
                $scope.results.forEach(function (prisoner) {
                    prisoner.arrivement = new Date(prisoner.arrivement);
                    prisoner.freedom = new Date(prisoner.freedom);
                    $scope.loadPrograms(prisoner);
                    $scope.loadWards(prisoner);
                });
            }, serverError);
        };

        $scope.delete = function (prisoner) {
            showInfo('Отправляю данные...');
            $http.post('/prisoner', {id: prisoner.id}).then(function () {
                showSuccess('Данные о заключённом удалены');
                $scope.searchPrisoners();
            }, serverError);
        };

        $scope.update = function (prisoner) {
            showInfo('Отправляю данные...');
            const programs = [], reputations = [];
            prisoner.programs.forEach(function (program) {
                programs.push(program.id);
            });
            prisoner.reputations.forEach(function (reputation) {
                reputations.push(reputation.id);
            });
            $http.patch('/prisoner', {
                id: prisoner.id,
                arrivement: prisoner.arrivement,
                freedom: prisoner.freedom,
                ward_fk: prisoner.room.id,
                regime_fk: prisoner.regime.id,
                programs: programs,
                reputations: reputations
            }).then(function(res) {
                showSuccess('Данные успешно обновлены!');
                $scope.searchPrisoners();
            }, serverError);
        }
    });
}) ();
