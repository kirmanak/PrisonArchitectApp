(function () {
    const prisoner = angular.module('prisoner', ['ui-notification']);

    prisoner.controller('prisonerController', function ($http, $log, $location, $scope, Notification) {
        const showSuccess = function (message) { Notification.success({ message: message, delay: 3000}); };
        const showInfo = function (message) { Notification.info({ message: message, delay: 1000}); };
        const clientError = function (message) { Notification.error({ message: message, delay: 1000}); };
        const serverError = function (error) {
            $log.error(error);
            Notification.error({ message: 'Что-то пошло не так...', delay: 5000});
        };

        // variables
        $scope.maxArrivement = new Date();
        $scope.minFreedom = new Date();
        $scope.data = {};
        $scope.reputations = [];
        $scope.programs = [];
        $scope.wards = [];
        $scope.regimes = [];

        $scope.sendPrisoner = function () {
            showInfo('Общаемся с сервером...');
            $http.put('/prisoner', {
                fullname:
                    $scope.data.surname + ' ' +
                    $scope.data.name + ' ' +
                    $scope.data.patronymic,
                arrivement: $scope.data.arrivement,
                freedom: $scope.data.freedom,
                ward_fk: $scope.data.ward_fk,
                regime_fk: $scope.data.regime_fk,
                programs: $scope.data.programs,
                reputations: $scope.data.reputations
            }).then(function () {
                    showSuccess('Успешно добавлен новый заключённый.');
                    $scope.data = {};
                },
                function (error) {
                    if (error.status === 403) {
                        clientError('Вы не авторизованы!');
                        $location.url('/login');
                    } else { serverError(error); }
                }
            );
        };

        $http.get('/prisoner/reputations').then(function (res) {
            $scope.reputations = res.data;
        }, serverError);

        // calls when regime changes
        $scope.regimeChanged = function () {
            $scope.loadPrograms();
            $scope.loadWards();
        };

        $scope.loadPrograms = function () {
            $http.post('/prisoner/programs', {id: $scope.data.regime_fk}).then(function (res) {
                $scope.programs = res.data;
            }, serverError);
        };

        $scope.loadWards = function () {
            $http.post('/prisoner/wards', {id: $scope.data.regime_fk}).then(function (res) {
                $scope.wards = res.data;
            }, serverError);
        };

        $http.get('/prisoner/regimes').then(function (res) {
            $scope.regimes = res.data;
        }, serverError);

        $scope.minFree = function () {
            $scope.minFreedom = $scope.data.arrivement;
        };
    });
}) ();
