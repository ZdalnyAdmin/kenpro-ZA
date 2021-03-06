﻿var ResetPasswordConfirmation = function ($scope, $routeParams, $location, UserFactory, UtilitiesFactory) {
    var search = $location.search();
    if(!search.code) {
        $location.path('/').search('');
        return;
    }

    $scope.resetPasswordData = {
            code: search.code
        };

    $scope.errorMessage = '';

    $scope.confirmResetPassword = function () {
        UtilitiesFactory.showSpinner();
        $scope.errorMessage = '';
        var result = UserFactory.resetPasswordConfirmation($scope.resetPasswordData);

        result.then(function (data) {
            UtilitiesFactory.hideSpinner();
            if (data.Succeeded) {
                $location.path('/signin').search('');
            } else {
                if (data.Errors) {
                    $scope.errorMessage = '';
                    angular.forEach(data.Errors, function (val) {
                        $scope.errorMessage += ' ' + val;
                    });
                } else {
                    $scope.errorMessage = 'Wystąpił nieoczekiwany błąd podczas zmiany hasła';
                }
            }
        });
    }
};

ResetPasswordConfirmation.$inject = ['$scope', '$routeParams', '$location', 'UserFactory', 'UtilitiesFactory'];
