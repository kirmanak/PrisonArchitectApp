(function () {
	var prisoner = angular.module('prisoner', ['ngRoute']);

	prisoner.controller('prisonerController',
            function($http, $log, $location, $scope) {
            var store = this;
            store.data = {};
            store.reputations = [];
            store.programs = [];
            store.wards = [];
            store.regimes = [];
            store.send = function () {
                $http.post('/prisoner', store.data).then(
                    function () {},
                    function (res) {
                        if (res.status === 403) {
                            $location.url('/login');
                        } else {
                            $log.error(res);
                        }
                    }
                );
            };
            $http.get('/prisoner/reputations').then(function (res) {
                store.reputations = res.data;
            });
            $scope.changeRegime = function () {
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
	});
})();
