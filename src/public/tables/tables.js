(function() {
    const tables = angular.module('tables', ['ngRoute', 'ngMaterial', 'ngMessages']);

    tables.controller('tablesController',
        function($http, $log, $location) {
            const store = this;
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
        load($http, $log, $location, store);
    });

    function load($http, $log, $location, store) {
        const errorLog = function (error) {
            Notification.error({
                message: 'Что-то пошло не так...',
                delay: 5000
            });
            $log.error(error);
        };

        $http.get('/prisoner').then(function(res) {
            store.prisoners = { count: res.data };
        }, function (res) {
            if (res.status === 403) { $location.url('/login'); }
            else { errorLog(res); }
        });


        $http.get('/staff').then(function(res) {
            store.staff = {
                count: res.data
            };
        }, errorLog);

        $http.get('/object').then(function(res) {
            store.objects = {
                count: res.data
            };
        }, errorLog);

        $http.get('/room').then(function(res) {
            store.rooms = {
                count: res.data
            };
        }, errorLog);
    }
})();
