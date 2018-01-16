(function () {
    var search = angular.module('prisonerSearch', ['menu']);

    search.controller('prisonerSearchController', function($log, $http) {
        var store = this;
        store.data = {};
        store.results = [];
        store.search = function() {
            store.data.fullname = store.data.surname + ' ' +
                store.data.name + ' ' +
                store.data.patronymic;
            $http.post('/prisoner/search', store.data).then(function (res) {
                $log.log(res);
                store.results = res.data;
            }, function(error) {
                $log.error(error);
            })
        };
    });

}) ();