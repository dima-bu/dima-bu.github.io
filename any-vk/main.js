angular.module('anyVk', ['ngStorage'])
    .controller('mainCtrl', function ($scope, $http, vkGet, loginVK) {

        $scope.name = 'Дима';
        $scope.login = function (id) {
            debugger;
            loginVK(id, secret, url)
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
            //var sid = $localStorage.get('sid');
            debugger;
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

        var loginVK = function (id, secret, url ) {
            debugger;
            $http({
                method: 'GET',
                url: 'https://oauth.vk.com/access_token?client_id=' + id+'&client_secret='+secret+'&redirect_uri='+url
            }).then(function successCallback (response) {
                debugger;
                deffer.resolve(response);
            }, function errorCallback (response) {

            });
            return deffer.promise;

        };

        return loginVK;

    });


