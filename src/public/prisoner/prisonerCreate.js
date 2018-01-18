(function () {
    const prisoner = angular.module('prisoner', []);

    prisoner.controller('prisonerController', function ($http, $log, $location, $scope) {
        // variables
        $scope.maxArrivement = new Date();
        $scope.minFreedom = new Date();
        $scope.data = {};
        $scope.reputations = [];
        $scope.programs = [];
        $scope.wards = [];
        $scope.regimes = [];
        $scope.status = '';

        // functions
        const errorLog = function (error) { $log.error(error); };

        $scope.sendPrisoner = function () {
            $scope.status = 'Общаемся с сервером...';
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
            }).then(
                function () {
                    $scope.status = 'Успешно добавлен новый заключённый.';
                    $scope.data = {};
                },
                function (error) {
                    if (status.status === 403) {
                        $scope.status = 'Вы не авторизованы!';
                        $location.url('/login');
                    } else {
                        $scope.status = 'Что-то пошло не так...';
                        errorLog(error);
                    }
                }
            );
        };

        $http.get('/prisoner/reputations').then(function (res) {
            $scope.reputations = res.data;
        }, errorLog);

        // calls when regime changes
        $scope.regimeChanged = function () {
            $scope.loadPrograms();
            $scope.loadWards();
        };

        $scope.loadPrograms = function () {
            $http.post('/prisoner/programs', {id: $scope.data.regime_fk}).then(function (res) {
                $scope.programs = res.data;
            }, errorLog);
        };

        $scope.loadWards = function () {
            $http.post('/prisoner/wards', {id: $scope.data.regime_fk}).then(function (res) {
                $scope.wards = res.data;
            }, errorLog);
        };

        $http.get('/prisoner/regimes').then(function (res) {
            $scope.regimes = res.data;
        }, errorLog);

        $scope.minFree = function () {
            $scope.minFreedom = $scope.data.arrivement;
        };
    });
}) ();
