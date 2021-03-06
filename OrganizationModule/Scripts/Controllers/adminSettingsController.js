﻿function adminSettingsController($scope, $rootScope, $http, $modal, UserFactory, UtilitiesFactory) {
    $scope.currentItem = {};
    $scope.viewModel = {};

    //Used to display the data 
    $scope.loadData = function () {
        UtilitiesFactory.showSpinner();
        $scope.currentItem = {};
        $scope.viewModel.ActionType = 0;

        $http.post('/api/Settings/', $scope.viewModel)
        .success(function (data) {
            $scope.viewModel = data;

            if ($scope.viewModel && $scope.viewModel.Success) {
                $rootScope.$broadcast('showGlobalMessage', {
                    success: true,
                    messageText: $scope.viewModel.Success
                });
            }

            if ($scope.viewModel.CurrentOrganization) {
                $scope.currentItem.ChangeMail = $scope.viewModel.CurrentOrganization.CanUserChangeMail ? "1" : "0";
                $scope.currentItem.ChangeName = $scope.viewModel.CurrentOrganization.CanUserChangeName ? "1" : "0";
            }
            UtilitiesFactory.hideSpinner();
        })
        .error(function () {
            $rootScope.$broadcast('showGlobalMessage', {
                success: false,
                messageText: 'Wystąpił nieoczekiwany błąd podczas pobierania ustawień'
            });
            UtilitiesFactory.hideSpinner();
        });

        //Used to display the data 

    }

    $scope.loadData();

    $scope.edit = function () {
        if (!$scope.viewModel.CurrentOrganization) {
            return;
        }
        UtilitiesFactory.showSpinner();

        $scope.viewModel.ActionType = 2;

        $scope.viewModel.CurrentOrganization.CanUserChangeName = $scope.currentItem.ChangeName == "1";
        $scope.viewModel.CurrentOrganization.CanUserChangeMail = $scope.currentItem.ChangeMail == "1";
       
        $http.post('/api/Settings/', $scope.viewModel)
        .success(function (data) {
            $scope.viewModel = data;

            if ($scope.viewModel && $scope.viewModel.Success) {
                $rootScope.$broadcast('showGlobalMessage', {
                    success: true,
                    messageText: $scope.viewModel.Success
                });
            }

            UtilitiesFactory.hideSpinner();
        })
        .error(function () {
            $rootScope.$broadcast('showGlobalMessage', {
                success: false,
                messageText: 'Wystąpił nieoczekiwany błąd podczas zapisu ustawień'
            });
            UtilitiesFactory.hideSpinner();
        });

    }
}

adminSettingsController.$inject = ['$scope', '$rootScope', '$http', '$modal', 'UserFactory', 'UtilitiesFactory'];