(function () {
    const staff = angular.module('staff', ['ui-notification', 'ngMaterial', 'ngMessages']);

    staff.controller('staffController', function($http, $log, $location, $scope, Notification) {
        const showSuccess = function (message) { Notification.success({ message: message, delay: 3000}); };
        const showInfo = function (message) { Notification.info({ message: message, delay: 1000}); };
        const clientError = function (message) { Notification.error({ message: message, delay: 1000}); };
        const serverError = function (error) {
            $log.error(error);
            Notification.error({ message: 'Что-то пошло не так...', delay: 5000});
        };
        $scope.data = {};
	    $scope.appointments = [];
        $scope.offices = [];
	    $scope.sendStaff = function() {
	        showInfo('Общаемся с сервером...');
	        $http.put('/staff', {
	            fullname:
                    $scope.data.surname + ' ' +
                    $scope.data.name + ' ' +
                    $scope.data.patronymic,
                appointment_fk: $scope.data.appointment_fk,
                office_fk: $scope.data.office_fk
            }).then(function () {
	            showSuccess('Новый сотрудник успешно добавлен');
	            $scope.data = {};
	            $scope.createForm.$setPristine();
                $scope.createForm.$setUntouched();
			}, function (error) {
	            if (error.status = 403) {
	                clientError('Вы не авторизованы');
	                $location.url = '/login';
                } else {
                    serverError(error);
                }
			});
		};
        $scope.loadOffices = function() {
            return new Promise(function (resolve, reject) {
                $http.get('/staff/offices').then(function (res) {
                    $scope.offices = res.data;
                    resolve();
                }, function(error) {
                    serverError(error);
                    reject();
                });
            });
        };

	    $scope.loadAppointments = function() {
	        return new Promise(function (resolve, reject) {
                $http.get('/staff/appointments').then(function (res) {
                    $scope.appointments = res.data;
                    resolve();
                }, function(error) {
                    serverError(error);
                    reject();
                });
            });
        };
	});
})();
