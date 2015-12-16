angular.module('anyVk', [])
    .controller('mainCtrl', function($scope, $http, vkGet) {

         $scope.name = 'Дима';
         $scope.login = function () {
             VK.Auth.login();
         };

        $scope.getName = function () {
            debugger;
            vkGet('users.get').then(function () {
                    $scope.name = response.response[0].first_name;
            });
        };
    }).
    factory('vkGet', function ($http, $q) {
        var deffer = $q.defer();

        var vkGet = function (method, token) {
            $http({
                method: 'GET',
                url: 'https://api.vk.com/method/'+ method
            }).then(function successCallback(response) {
                deffer.resolve(response);
            }, function errorCallback(response) {

            });
            return deffer.promise;
        }

        return vkGet;

    });


