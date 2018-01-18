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
            $http.post('/prisoner/programs', {id: prisoner.regime_fk}).then(function (res) {
                prisoner.availablePrograms = res.data;
            }, errorLog);
        };

        $scope.loadWards = function (prisoner) {
            $http.post('/prisoner/wards', {id: prisoner.regime_fk}).then(function (res) {
                prisoner.availableWards = res.data;
            }, errorLog);
        };

        $scope.searchPrisoners = function () {
            $http.post('/prisoner/search', {
                fullname:
                    $scope.data.surname + ' ' +
                    $scope.data.name + ' ' +
                    $scope.data.patronymic
            }).then(function (res) {
                $scope.results = res.data;
                $scope.results.forEach(function (prisoner) {
                    prisoner.arrivement = new Date(prisoner.arrivement);
                    prisoner.freedom = new Date(prisoner.freedom);
                    prisoner.programs.forEach(function (program) {
                        // noinspection JSUnusedAssignment
                        program = program.id;
                    });
                    prisoner.reputations.forEach(function (reputation) {
                        // noinspection JSUnusedAssignment
                        reputation = reputation.id;
                    });
                    $scope.loadPrograms(prisoner);
                    $scope.loadWards(prisoner);
                });
            }, errorLog);
        };

        $scope.delete = function (prisoner) {
            $http.post('/prisoner', {id: prisoner.id}).then(function () {
                $scope.searchPrisoners();
                $scope.status = 'Данные о заключённом удалены';
            }, errorLog);
        };

        $scope.update = function (prisoner) {
            $http.patch('/prisoner', {
                id: prisoner.id,
                arrivement: prisoner.arrivement,
                freedom: prisoner.freedom,
                ward_fk: prisoner.ward_fk,
                regime_fk: prisoner.regime_fk,
                programs: prisoner.programs,
                reputations: prisoner.reputations
            }).then(function(res) {
                $log.log(res);
                $scope.status = 'Данные успешно обновлены!';
            }, errorLog);
        }
    });
}) ();
