﻿function adminManagmentController($scope, $http) {
    $scope.loading = true;
    $scope.addMode = false;
    $scope.selectedGroups = [];

    $scope.loadData = function () {
        $http.get('/api/Training').success(function (data) {
            var internalTrainings = [];
            var kenproTrainings = [];
            angular.forEach(data, function (item) {
                if (item.TrainingTypeID == 1) {
                    internalTrainings.push(item);
                }
                else {
                    kenproTrainings.push(item);
                }
            });
            $scope.InternalTrainings = internalTrainings;
            $scope.KenproTrainings = kenproTrainings;
            $scope.loading = false;
        })
        .error(function () {
            $scope.error = "An Error has occured while loading posts!";
            $scope.loading = false;
        });
    }

    $scope.loadGroups = function () {
        $http.get('/api/Group').success(function (data) {
            $scope.Groups = data;
            $scope.loading = false;
        })
        .error(function () {
            $scope.error = "An Error has occured while loading posts!";
            $scope.loading = false;
        });
    }

    $scope.changeStatus = function(training)
    {
        if(!training)
        {
            return;
        }

        training.IsActive = !training.IsActive;

        $http.put('/api/Training', training).success(function (data) {
            $scope.loading = false;
            $scope.loadData();
        })
        .error(function () {
            $scope.error = "An Error has occured while loading posts!";
            $scope.loading = false;
        });
    }

    $scope.selectGroup = function(group)
    {
        if(!group)
        {
            return;
        }

        $scope.selectedGroups.push(group);


    }

    $scope.loadData();
    $scope.loadGroups();
}