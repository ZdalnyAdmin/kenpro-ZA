﻿var OrganizationModuleApp = window.App;

OrganizationModuleApp.controller('BaseController', BaseController);
OrganizationModuleApp.controller('LoginController', LoginController);
OrganizationModuleApp.controller('LogoffController', LogoffController);
OrganizationModuleApp.controller('RegisterController', RegisterController);
OrganizationModuleApp.controller('invitationController', invitationController);
OrganizationModuleApp.controller('ResetPasswordController', ResetPasswordController);
OrganizationModuleApp.controller('usersListModalController', usersListModalController);
OrganizationModuleApp.controller('trainingController', trainingController);
OrganizationModuleApp.controller('ResetPasswordConfirmation', ResetPasswordConfirmation);
OrganizationModuleApp.controller('ViewWrapperController', ViewWrapperController);
OrganizationModuleApp.factory('AuthHttpResponseInterceptor', AuthHttpResponseInterceptor);
OrganizationModuleApp.factory('UserFactory', UserFactory);
OrganizationModuleApp.factory('UtilitiesFactory', UtilitiesFactory);
//OrganizationModuleApp.service('SessionService', SessionService)

var configFunction = function ($routeProvider, $httpProvider, $locationProvider) {

    $locationProvider.hashPrefix('!').html5Mode(true);

    $routeProvider.
        when('/userCurrent', {
            templateUrl: 'User/LoggedUser'
        })
        .when('/userTrainings', {
            templateUrl: 'User/TrainingList'
        })
        .when('/userAvailableTrainings', {
            templateUrl: 'User/AvailableTrainingList'
        })
        .when('/userResult', {
            templateUrl: 'User/TrainingResult'
        })
        .when('/userFaq', {
            templateUrl: 'User/TrainingFaq'
        })
        .when('/creatorTraining', {
            templateUrl: 'Creator/CreateTemplate'
         })
        .when('/creatorTrainings', {
            templateUrl: 'Creator/EditTemplate'
        })
        .when('/creatorHowTo', {
            templateUrl: 'Creator/About'
        })
        .when('/managerResult', {
            templateUrl: 'Manager/Results'
        })
        .when('/managerEdit', {
            templateUrl: 'Manager/EditTrainings'
        })
        .when('/managerInvitation', {
            templateUrl: 'Manager/Invitation',
            controller: invitationController
        })
        .when('/adminUsers', {
            templateUrl: 'Admin/Users'
        })
        .when('/adminGroups', {
            templateUrl: 'Admin/Groups'
        })
        .when('/adminManage', {
            templateUrl: 'Admin/Managment'
        })
        .when('/adminStats', {
            templateUrl: 'Admin/Statistics'
        })
        .when('/adminSettings', {
            templateUrl: 'Admin/Settings'
        })
        .when('/adminHowTo', {
            templateUrl: 'Admin/About'
        })
        .when('/protectorRoles', {
            templateUrl: 'Protector/Roles'
        })
        .when('/protectorLogs', {
            templateUrl: 'Protector/Logs'
        })
        .when('/signin', {
            templateUrl: 'Account/Login',
            controller: LoginController
        })
        .when('/resetPassword', {
            templateUrl: 'Account/ResetPassword',
            controller: ResetPasswordController
        })
        .when('/resetPasswordConfirmation', {
            templateUrl: 'Account/ResetPasswordConfirmation',
            controller: ResetPasswordConfirmation
        })
        .when('/ActiveTraining/:trainingID', {
            templateUrl: function (param) {
                return '../Training/ActiveTraining/' + param.trainingID;
            },
            controller: trainingController
        })
        .when('/Templates/registerUser', {
            templateUrl: 'viewWrapper.html',
            controller: ViewWrapperController
        })
        .when('/logoff', {
            templateUrl: 'Account/Logoff',
            controller: LogoffController
        });

    $httpProvider.interceptors.push('AuthHttpResponseInterceptor');
}

configFunction.$inject = ['$routeProvider', '$httpProvider', '$locationProvider'];

OrganizationModuleApp.config(configFunction);

OrganizationModuleApp.run(function ($rootScope, $location, UtilitiesFactory) {
    $rootScope.$on('$routeChangeStart', function () {
        //show loading gif
        UtilitiesFactory.showSpinner();
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        //hide loading gif
        UtilitiesFactory.hideSpinner();
    });
    $rootScope.$on('$routeChangeError', function () {
        //hide loading gif
        UtilitiesFactory.hideSpinner();
    });
});