(function() {
    var tables = angular.module('tables', ['ngRoute', 'menu']);

    tables.controller('tablesController', ['$http', '$log', '$scope',
        '$routeParams', function($http, $log, $scope, $routeParams) {
        $scope.name = 'tablesController';
        $scope.params = $routeParams;

        var store = this;
        store.prisoners = {
            count: 0
        };
        store.staff = {
            count: 0
        };
        store.objects = {
            count: 0
        };
        store.rooms = {
            count: 0
        };
        load($http, $log, store);
    }]);

    function load($http, $log, store) {
        $http.get('/prisoner').then(function(res) { 
            store.prisoners = {
                count: res.data
            };
        }, function (error) { $log.error(error); });

        $http.get('/staff').then(function(res) { 
            store.staff = {
                count: res.data
            };
        }, function (error) { $log.error(error); });

        $http.get('/objects').then(function(res) { 
            store.objects = {
                count: res.data
            };
        }, function (error) { $log.error(error); });

        $http.get('/rooms').then(function(res) { 
            store.rooms = {
                count: res.data
            };
        }, function (error) { $log.error(error); });
    }
})();
