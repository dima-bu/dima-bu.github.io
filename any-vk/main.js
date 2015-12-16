angular.module('anyVk', [])
    .controller('mainCtrl', function($scope) {

         $scope.name = '';
         $scope.login = function () {
             VK.Auth.login();
         };

        $scope.getName = function () {
            VK.Api.call('users.get', {}, function(r) {
                if(r.response) {
                    $scope.name = r.response[0].first_name;
                }
            });
        }
    });


