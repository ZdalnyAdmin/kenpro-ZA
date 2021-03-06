﻿window.App
.directive('ngMenu', [function () {
    return {
        scope: true,
        restrict: 'A',
        replace: 'true',
        templateUrl: 'Templates/menu.html',
        controller: ['$scope', 'UserFactory', '$location', '$rootScope', function ($scope, UserFactory, $location, $rootScope) {
            $scope.menuUrl = '';
            $scope.currentUser = {};
            $scope.visible = false;
            var MENU_URL = '../Menu/Index?random=';

            function reload() {
                $scope.currentUser = {};
                $scope.visible = false;

                var result = UserFactory.getLoggedUser();

                result.then(function (user) {
                    if (user && user.Id) {
                        var random = Math.random();
                        $scope.menuUrl = MENU_URL + random;
                        $scope.visible = true;
                        $scope.currentUser = user;
                    } else {
                        $scope.menuUrl = '';

                        if ($location.path().indexOf('/resetPassword') == -1 &&
                            $location.path().indexOf('/signin') == -1 &&
                            $location.path().indexOf('/registerUser') == -1 &&
                            $location.path().indexOf('/changeEmail') == -1 && 
                            $location.path().indexOf('/Templates/changeUserEmail' == -1) &&
                            $location.path().indexOf('/deleteUser') == -1) {
                                $location.path('/signin').search('');
                        }
                    }
                });
            }

            $rootScope.$on('userChanged', function (e, args) {
                if (!!args && args.preventReloadMenu) {
                    return;
                }

                UserFactory.clearUser();
                reload();
            });
            $rootScope.$on('reloadMenu', reload);

            reload();
        }]
    }
}]);