﻿window.App
.directive('ngTrainingFileEditor', [function () {
    return {
        scope: { obj: '=' },
        restrict: 'A',
        replace: 'true',
        templateUrl: 'Templates/trainingFileEditor.html',
        controller: ['$scope', function ($scope) {
            $scope.currentDetail = {};

            $scope.cancel = function (item) {
                $scope.currentDetail.ResourceType = -1;
                $scope.obj.push($scope.currentDetail);

                $scope.currentDetail.InternalResource = '';
                $scope.currentDetail.ResourceType = undefined;
                $scope.currentDetail.isEdit = undefined;

                $scope.currentDetail.Name = '';
            }

            $scope.add = function (item) {
                if (!$scope.currentDetail) {
                    return;
                }

                if ($scope.currentDetail.InternalResource) {
                    $scope.currentDetail.isEdit = false;
                    $scope.currentDetail.ResourceType = 4;
                    $scope.obj.push($scope.currentDetail);
                    $scope.obj.push(angular.copy($scope.currentDetail));
                    $scope.cancel();
                    return;
                }
            }
        }]
    };
}]);