(function () {
    const prisoner = angular.module('prisoner', []);

    prisoner.controller('prisonerController',
            function($http, $log, $location, $scope) {
                const store = this;
                store.maxArrivement = new Date();
            store.minFreedom = new Date();
            store.data = {};
            store.reputations = [];
            store.programs = [];
            store.wards = [];
            store.regimes = [];
            store.status = '';
            store.send = function () {
                store.data.fullName =
                    store.data.surname + ' ' +
                    store.data.name + ' ' +
                    store.data.patronymic;
                store.status = 'Общаемся с сервером...';
                $http.put('/prisoner', store.data).then(
                    function () {
                        store.status = 'Успешно добавлен новый заключённый.';
                    },
                    function (error) {
                        if (status.status === 403) {
                            store.status = 'Вы не авторизованы!';
                            $location.url('/login');
                        } else {
                            store.status = 'Что-то пошло не так...';
                            $log.status(status);
                        }
                    }
                );
            };
            $http.get('/prisoner/reputations').then(function (res) {
                store.reputations = res.data;
            });
            $scope.regimeChanged = function () {
                store.loadPrograms();
                store.loadWards();
            };
            store.loadPrograms = function() {
                $http.post('/prisoner/programs', store.data.regime).then(function (res) {
                    store.programs = res.data;
                });
            };
            store.loadWards = function () {
                $http.post('/prisoner/wards', store.data.regime).then(function (res) {
                    store.wards = res.data;
                });
            };
            $http.get('/prisoner/regimes').then(function (res) {
                store.regimes = res.data;
            });
            $scope.minFree = function () {
                store.minFreedom = store.data.arrivement;
            };
	});
})();
