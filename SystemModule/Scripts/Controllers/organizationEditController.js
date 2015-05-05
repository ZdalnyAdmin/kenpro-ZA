﻿function organizationEditController($scope, $http, $modal) {
    $scope.loading = true;
    $scope.list = [];

    $scope.loadDate = function () {
        $http.get('/api/Organizations').success(function (data) {
            $scope.list = data;
            $scope.loading = false;
        })
        .error(function () {
            $scope.error = "An Error has occured while loading posts!";
            $scope.loading = false;
        });
    }

    $scope.loadDate();
}

organizationEditController.$inject = ['$scope', '$http', '$modal'];