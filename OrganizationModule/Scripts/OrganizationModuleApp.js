﻿var OrganizationModuleApp = window.App;

OrganizationModuleApp.controller('BaseController', BaseController);
OrganizationModuleApp.controller('LoginController', LoginController);
OrganizationModuleApp.controller('LogoffController', LogoffController);
OrganizationModuleApp.controller('RegisterController', RegisterController);
OrganizationModuleApp.controller('invitationController', invitationController);
OrganizationModuleApp.controller('adminManagmentController', adminManagmentController);
OrganizationModuleApp.controller('ResetPasswordController', ResetPasswordController);
OrganizationModuleApp.controller('usersListModalController', usersListModalController);
OrganizationModuleApp.controller('trainingController', trainingController);
OrganizationModuleApp.controller('trainingListController', trainingListController);
OrganizationModuleApp.controller('ResetPasswordConfirmation', ResetPasswordConfirmation);
OrganizationModuleApp.controller('ViewWrapperController', ViewWrapperController);
OrganizationModuleApp.controller('errorController', errorController);
OrganizationModuleApp.factory('AuthHttpResponseInterceptor', AuthHttpResponseInterceptor);
OrganizationModuleApp.factory('UserFactory', UserFactory);
OrganizationModuleApp.factory('TrainingFactory', TrainingFactory);
OrganizationModuleApp.factory('UtilitiesFactory', UtilitiesFactory);
OrganizationModuleApp.factory('loggedUserController', loggedUserController);
//OrganizationModuleApp.service('SessionService', SessionService)

var configFunction = function ($routeProvider, $httpProvider, $locationProvider, $compileProvider) {

    $locationProvider.hashPrefix('!').html5Mode(true);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(http?|https?|ftp|mailto|tel|file|blob):/);

    $routeProvider
        .when('/userTranings', {
            templateUrl: function () {
                return 'Training/TrainingList?random= '+ (Math.floor((Math.random() * 999999999) + 1));
            },
            controller: trainingListController
        })
        .when('/userCurrent', {
            templateUrl: 'User/LoggedUser',
            controller: loggedUserController
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
        .when('/creatorTrainingList', {
            templateUrl: 'Creator/TemplateList'
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
        .when('/Templates/changeUserEmail', {
            templateUrl: 'viewWrapper.html',
            controller: ViewWrapperController
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
            templateUrl: 'Admin/Managment',
            controller: adminManagmentController
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
            templateUrl: function (param) {
                return 'Account/ResetPasswordConfirmation?code=' + param.code + '&id=' + param.id;
            },
            controller: ResetPasswordConfirmation
        })
        .when('/ActiveTraining/:trainingID', {
            templateUrl: function (param) {
                return '../Training/ActiveTraining/' + param.trainingID;
            },
            controller: trainingController
        })
        .when('/Error/:errorId', {
            templateUrl: '../Templates/error.html',
            controller: errorController
        })
        .when('/Templates/registerUser', {
            templateUrl: 'viewWrapper.html',
            controller: ViewWrapperController
        })
        .when('/logoff', {
            templateUrl: 'Account/Logoff',
            controller: LogoffController
        })
        .otherwise({ redirectTo: '/userTranings' });

    $httpProvider.interceptors.push('AuthHttpResponseInterceptor');
}

configFunction.$inject = ['$routeProvider', '$httpProvider', '$locationProvider', '$compileProvider'];

OrganizationModuleApp.config(configFunction);

OrganizationModuleApp.run(['$rootScope', '$location', 'UtilitiesFactory', '$templateCache', '$route', 'UserFactory', function ($rootScope, $location, UtilitiesFactory, $templateCache, $route, UserFactory) {
    $rootScope.$on('$routeChangeStart', function () {
        //show loading gif
        UtilitiesFactory.showSpinner();
        UserFactory.checkUser();
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        //hide loading gif
        UtilitiesFactory.hideSpinner();
        var currentPageTemplate = $route.current.loadedTemplateUrl;
        $templateCache.remove(currentPageTemplate);
    });
    $rootScope.$on('$routeChangeError', function () {
        //hide loading gif
        UtilitiesFactory.hideSpinner();
    });
}]);