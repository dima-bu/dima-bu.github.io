var searchApp = angular.module('searchApp', ['infinite-scroll'] );

searchApp.controller('SearchListCtrl', function ($scope, $http) {

    $scope.search = function() {

        var val = $scope.searchText;

        $http.jsonp(
                'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q='+ val + '&rsz=8&start=0&callback=JSON_CALLBACK'
        ).success(function(data) {
                $scope.images = data.responseData.results;
            });

    };

    $scope.count = 8;

    $scope.loadMore = function() {
        console.log($scope.count)
        var val = $scope.searchText;

        if ($scope.count < 57) {
            $http.jsonp(
                    'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q='+ val + '&rsz=8&start='+ $scope.count +'&&callback=JSON_CALLBACK'
            ).success(function(data) {

//                $scope.image =  data.responseData.results[1];

                    for (i=0;i<8;i++) {
                        $scope.images.push(data.responseData.results[i]);
                    }
                    $scope.count=$scope.count + 8;
                });
        } else {
            return false
        }

    };

});

