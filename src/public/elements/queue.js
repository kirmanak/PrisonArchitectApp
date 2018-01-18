(function() {
    var queue = angular.module('queue', []);

    queue.directive('queue', function() {
        return {
            restrict: 'E',
            templateUrl: 'elements/queue.html',
            controller: 'queueController',
            controllerAs: 'queue'
        };
    });

    queue.controller('queueController', function ($scope) {
        $scope.MQ = '';
        var client = Stomp.client('ws://localhost:15674/ws');
        client.connect('guest', 'guest', function() {
            client.subscribe('/exchange/staffEx', function (message) {
                $scope.MQ = message.body;
            });
        });
    });
}) ();
