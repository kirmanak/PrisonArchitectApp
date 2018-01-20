(function () {
    const search = angular.module('prisonerSearch', []);

    search.controller('prisonerSearchController', function ($log, $http, $scope) {
        // variables
        $scope.data = {};
        $scope.results = [];
        $scope.reputations = [];
        $scope.regimes = [];
        $scope.status = '';

        // functions
        const errorLog = function (error) { $log.error(error); };

        $http.get('/prisoner/regimes').then(function (res) {
            $scope.regimes = res.data;
        }, errorLog);

        $http.get('/prisoner/reputations').then(function (res) {
            $scope.reputations = res.data;
        }, errorLog);

        // calls when regime changes
        $scope.regimeChanged = function (prisoner) {
            $scope.loadPrograms(prisoner);
            $scope.loadWards(prisoner);
        };

        $scope.loadPrograms = function (prisoner) {
            $http.post('/prisoner/programs', {id: prisoner.regime.id}).then(function (res) {
                prisoner.availablePrograms = res.data;
            }, errorLog);
        };

        $scope.loadWards = function (prisoner) {
            $http.post('/prisoner/wards', {id: prisoner.regime.id}).then(function (res) {
                prisoner.availableWards = res.data;
            }, errorLog);
        };

        $scope.searchPrisoners = function () {
            $scope.status = 'Выполняю поиск...';
            $http.post('/prisoner/search', {
                fullname:
                    $scope.data.surname + ' ' +
                    $scope.data.name + ' ' +
                    $scope.data.patronymic
            }).then(function (res) {
                $scope.status = 'Поиск завершён!';
                $scope.results = res.data;
                $scope.results.forEach(function (prisoner) {
                    prisoner.arrivement = new Date(prisoner.arrivement);
                    prisoner.freedom = new Date(prisoner.freedom);
                    $scope.loadPrograms(prisoner);
                    $scope.loadWards(prisoner);
                });
            }, errorLog);
        };

        $scope.delete = function (prisoner) {
            $scope.status = 'Отправляю данные...';
            $http.post('/prisoner', {id: prisoner.id}).then(function () {
                $scope.status = 'Данные о заключённом удалены';
                $scope.searchPrisoners();
            }, errorLog);
        };

        $scope.update = function (prisoner) {
            $scope.status = 'Отправляю данные...';
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
                $scope.status = 'Данные успешно обновлены!';
                $scope.searchPrisoners();
            }, errorLog);
        }
    });
}) ();
