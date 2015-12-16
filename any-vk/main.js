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

        var loginVK = function (id) {

            VK.init({
                apiId: id
            });

            VK.Auth.getLoginStatus(authInfo);
            function authInfo(response) {
                if (response.session) {
                    alert('user: '+response.session.mid);
                } else {
                    alert('not auth');
                }
            }
        };

        return loginVK;

    });


