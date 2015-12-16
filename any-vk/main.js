angular.module('anyVk', ['ngStorage'])
    .controller('mainCtrl', function ($scope, $http, vkGet, loginVK) {

        $scope.name = 'Дима';
        $scope.login = function (id) {
            debugger;
            loginVK(id)
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
                url: 'https://api.vk.com/method/' + method
            }).then(function successCallback (response) {
                deffer.resolve(response);
            }, function errorCallback (response) {

            });
            return deffer.promise;
        }

        return vkGet;

    }).
    factory('loginVK', function ($http, $q, $localStorage) {
        var deffer = $q.defer();

        var loginVK = function (id) {
            $http({
                method: 'GET',
                url: 'https://login.vk.com/?act=openapi&oauth=1&aid=' + id + '&location=dima-bu.github.io&new=1'
            }).then(function successCallback (response) {
                debugger;
                $localStorage.set('token', response.access_token)
                deffer.resolve(response);
            }, function errorCallback (response) {

            });
            return deffer.promise;
        }

        return loginVK;

    });


