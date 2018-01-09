(function () {
	var staff = angular.module('staff', []);

	staff.directive('staff', function () {
            return {
    	        restrict: 'E',
    		templateUrl: 'staff/staff.html',
    		controller: 'staffController',
    		controllerAs: 'staff'
	    };
	});

	staff.controller('staffController', ['$http', '$log', function($http, $log) {
            this.data = {};
            this.send = function () {
                $log.log(this.data);
                $http.post('/staff', this.data);
            };
	}]);
})();
