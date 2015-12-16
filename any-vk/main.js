angular.module('anyVk', ['ngStorage'])
    .controller('mainCtrl', function ($scope, $http, vkGet, loginVK, loginVK2) {

        $scope.name = 'Дима';
        $scope.login = function (id, secret, url) {
            debugger;
            loginVK(id, secret, url);
        };
        $scope.login2 = function (id, secret, url) {
            debugger;
            loginVK2();
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
                url: 'https://oauth.vk.com/access_token?client_id=?display=popup?response_type=token?' + id+'&client_secret='+secret+'&redirect_uri='+url
            }).then(function successCallback (response) {
                debugger;
                deffer.resolve(response);
            }, function errorCallback (response) {

            });
            return deffer.promise;

        };

        return loginVK;

    }).factory('loginVK2', function ($http, $q, $localStorage) {
        var deffer = $q.defer();

        var loginVK = function () {
            debugger;
            $http({
                method: 'GET',
                url: 'https://oauth.vk.com/authorize?client_id=1&display=page&redirect_uri=http://http://dima-bu.github.io/any-vk/&scope=friends&response_type=token&v=5.41'
            }).then(function successCallback (response) {
                debugger;
                deffer.resolve(response);
            }, function errorCallback (response) {

            });
            return deffer.promise;

        };

        return loginVK;

    });


