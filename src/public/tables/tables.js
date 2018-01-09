(function() {
    var tables = angular.module('tables', []);

    tables.directive('tables', function() {
        return {
    	    restrict: 'E',
    	    templateUrl: 'tables/tables.html',
    	    controller: 'tablesController',
    	    controllerAs: 'tables'
    	};
    });

    tables.controller('tablesController', ['$http', '$log', function($http, $log) {
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
