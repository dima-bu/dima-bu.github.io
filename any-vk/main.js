angular.module('anyVk', ['ngStorage'])
    .controller('mainCtrl', function ($scope, $http, vkGet) {

        $scope.showMe = function () {
            vkGet('users.get', {user_ids: $scope.currentUser.id, fields: 'photo_400_orig, contacts'}).then(function (response) {
                $scope.currentUser.photo_400_orig = response[0].photo_400_orig;
                $scope.currentUser.first_name = response[0].first_name;
            });
        };

        $scope.showFriends = function () {
            debugger;
            vkGet('friends.get', {user_id: parseInt($scope.currentUser.id, 10), fields: 'photo_50'}).then(function (response) {
                debugger;
                $scope.friends = response
            });
        };

        
        $scope.login = function () {
            VK.Auth.login($scope.authInfo, 16);
        };

        $scope.authInfo = function (response) {
                if (response.session) {
                    $scope.currentUser = response.session.user;
                }
        }
        
    }).
    factory('vkGet', function ($http, $q) {
        var deffer = $q.defer();

        var vkGet = function (method, params) {
            VK.Api.call(method, params, function(r) {
                if(r.response) {
                    deffer.resolve(r.response);
                }
            });
            return deffer.promise;
        }

        return vkGet;

    })


