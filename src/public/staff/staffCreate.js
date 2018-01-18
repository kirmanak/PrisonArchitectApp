(function () {
    const staff = angular.module('staff', []);

    staff.controller('staffController', function($http, $log, $location, $scope) {
        $scope.data = {};
	    $scope.appointments = [];
        $scope.offices = [];
	    $scope.status = '';
	    $scope.sendStaff = function() {
	        $scope.status = 'Общаемся с сервером...';
	        $http.put('/staff', {
	            fullname:
                    $scope.data.surname + ' ' +
                    $scope.data.name + ' ' +
                    $scope.data.patronymic,
                appointment_fk: $scope.data.appointment_fk,
                office_fk: $scope.data.office_fk
            }).then(function () {
	            $scope.status = 'Новый сотрудник успешно добавлен';
	            $scope.data = {};
			}, function (error) {
	            if (error.status = 403) {
	                $scope.status = 'Вы не авторизованы';
	                $location.url = '/login';
                } else {
                    $scope.status = 'Что-то пошло не так...';
                    $log.error(error);
                }
			});
		};
        $http.get('/staff/offices').then(function (res) {
            $scope.offices = res.data;
        }, function (error) {
            $scope.status = 'Что-то пошло не так...';
            $log.error(error);
        });

	    $http.get('/staff/appointments').then(function (res) {
	        $scope.appointments = res.data;
        }, function (error) {
            $scope.status = 'Что-то пошло не так...';
            $log.error(error);
        });
	});
})();
