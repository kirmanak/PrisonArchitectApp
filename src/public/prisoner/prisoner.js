(function () {
    const prisoner = angular.module('prisoner', ['ui-notification', 'ngMaterial', 'ngMessages', 'md.data.table']);

    prisoner.controller('prisonerCtrl', function ($http, $log, $location, $scope, Notification) {
        const showSuccess = function (message) { Notification.success({ message: message, delay: 3000}); };
        const showInfo = function (message) { Notification.info({ message: message, delay: 1000}); };
        const clientError = function (message) { Notification.error({ message: message, delay: 1000}); };
        const serverError = function (error) {
            $log.error(error);
            Notification.error({ message: 'Что-то пошло не так...', delay: 5000});
        };

        // variables
        $scope.data = {};
        $scope.reputations = [];
        $scope.programs = [];
        $scope.wards = [];
        $scope.regimes = [];
        $scope.query = {};
        $scope.results = [];
        $scope.today = new Date();
        $scope.regimeChoosen = false;

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
                    $scope.createForm.$setPristine();
                    $scope.createForm.$setUntouched();
                }, function (error) {
                    if (error.status === 403) {
                        clientError('Вы не авторизованы!');
                        $location.url('/login');
                    } else { serverError(error); }
                }
            );
        };

        $scope.searchPrisoners = function () {
            showInfo('Выполняю поиск...');
            $http.post('/prisoner/search', {
                fullname:
                $scope.query.surname + ' ' +
                $scope.query.name + ' ' +
                $scope.query.patronymic
            }).then(function (res) {
                $scope.results = res.data;
                $scope.query = {};
                $scope.searchForm.$setPristine();
                $scope.searchForm.$setUntouched();
                const promises = [];
                promises.push($scope.loadRegimes());
                promises.push($scope.loadReputations());
                $scope.results.forEach(function (prisoner) {
                    prisoner.arrivement = new Date(prisoner.arrivement);
                    prisoner.freedom = new Date(prisoner.freedom);
                    promises.push($scope.loadAvailablePrograms(prisoner));
                    promises.push($scope.loadAvailableWards(prisoner));
                    prisoner.programs.forEach(function (program) {
                        prisoner.programs[prisoner.programs.indexOf(program)] = program.id;
                    });
                    prisoner.reputations.forEach(function (reputation) {
                        prisoner.reputations[prisoner.reputations.indexOf(reputation)] = reputation.id;
                    });
                });
                Promise.all(promises).then(function () {
                    showSuccess('Найдено ' + res.data.length + ' записей');
                }, serverError);
            }, serverError);
        };

        $scope.delete = function (prisoner, index) {
            showInfo('Отправляю данные...');
            $http.post('/prisoner', {id: prisoner.id}).then(function () {
                showSuccess('Данные о заключённом удалены');
                $scope.results.splice(index, 1);
            }, serverError);
        };

        $scope.update = function (prisoner) {
            showInfo('Отправляю данные...');
            $http.patch('/prisoner', {
                id: prisoner.id,
                freedom: prisoner.freedom,
                ward_fk: prisoner.room.id,
                regime_fk: prisoner.regime.id,
                programs: prisoner.programs,
                reputations: prisoner.reputations
            }).then(function(res) {
                showSuccess('Данные успешно обновлены!');
            }, serverError);
        };

        // calls when regime changes
        $scope.regimeChanged = function () {
            $scope.loadPrograms();
            $scope.loadWards();
            $scope.regimeChoosen = true;
        };

        $scope.searchRegimeChanged = function (prisoner) {
            showInfo('Вы сменили режим, загружаю доступные камеры и программы...');
            const promises = [];
            promises.push($scope.loadAvailablePrograms(prisoner));
            promises.push($scope.loadAvailableWards(prisoner));
            Promise.all(promises).then(function () {
                showSuccess('Новые камеры и программы доступны для выбора');
            }, serverError);
        };


        $scope.loadReputations = function () {
            return new Promise(function (resolve, reject) {
                $http.get('/prisoner/reputations').then(function (res) {
                    $scope.reputations = res.data;
                    resolve();
                }, function (error) {
                    serverError(error);
                    reject();
                });
            });
        };

        $scope.loadPrograms = function () {
            return new Promise(function (resolve, reject) {
                $http.post('/prisoner/programs', {id: $scope.data.regime_fk}).then(function (res) {
                    $scope.programs = res.data;
                    resolve();
                }, function (error) {
                    serverError(error);
                    reject();
                });
            });
        };

        $scope.loadWards = function () {
            return new Promise(function (resolve, reject) {
                $http.post('/prisoner/wards', {id: $scope.data.regime_fk}).then(function (res) {
                    $scope.wards = res.data;
                    resolve();
                }, function (error) {
                    serverError(error);
                    reject();
                });
            });
        };

        $scope.loadAvailablePrograms = function (prisoner) {
            return new Promise(function (resolve, reject) {
                $http.post('/prisoner/programs', {id: prisoner.regime_fk}).then(function (res) {
                    prisoner.availablePrograms = res.data;
                    resolve();
                }, function (error) {
                    serverError(error);
                    reject();
                });
            });
        };

        $scope.loadAvailableWards = function (prisoner) {
            return new Promise(function (resolve, reject) {
                $http.post('/prisoner/wards', {id: prisoner.regime_fk}).then(function (res) {
                    prisoner.availableWards = res.data;
                    resolve();
                }, function (error) {
                    serverError(error);
                    reject();
                });
            });
        };
        $scope.loadRegimes = function () {
            return new Promise(function (resolve, reject) {
                $http.get('/prisoner/regimes').then(function (res) {
                    $scope.regimes = res.data;
                    resolve();
                }, function (error) {
                    serverError(error);
                    reject();
                });
            });
        };
    });
}) ();
