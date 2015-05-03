﻿var UserFactory = function ($http, $q) {
    var login = function (emailAddress, password) {

        var deferredObject = $q.defer();

        $http.post(
            '/Account/Login', {
                Email: emailAddress,
                Password: password
            }
        ).
        success(function (data) {
            if (data == "True") {
                deferredObject.resolve({ success: true });
            } else {
                deferredObject.resolve({ success: false });
            }
        }).
        error(function () {
            deferredObject.resolve({ success: false });
        });

        return deferredObject.promise;
    };

    var logoff = function () {

        var deferredObject = $q.defer();

        $http.post(
            '/Account/Logoff'
        ).
        success(function (data) {
            if (data == "True") {
                deferredObject.resolve({ success: true });
            } else {
                deferredObject.resolve({ success: false });
            }
        }).
        error(function () {
            deferredObject.resolve({ success: false });
        });

        return deferredObject.promise;
    };

    var register = function (registrationData) {

        var deferredObject = $q.defer();

        $http.post(
            '/Account/Register', registrationData
        ).
        success(function (data) {
            deferredObject.resolve(data);
        }).
        error(function () {
            deferredObject.resolve({ result: false });
        });

        return deferredObject.promise;
    };

    var reset = function (resetObject) {

        var deferredObject = $q.defer();

        $http.post(
            '/Account/ResetPassword', resetObject
        ).
        success(function (data) {
            deferredObject.resolve(data);
        }).
        error(function () {
            deferredObject.resolve(data);
        });

        return deferredObject.promise;
    };

    var resetPasswordConfirmation = function (resetObject) {

        var deferredObject = $q.defer();

        $http.post(
            '/Account/ResetPasswordConfirmation', resetObject
        ).
        success(function (data) {
            deferredObject.resolve(data);
        }).
        error(function () {
            deferredObject.resolve(data);
        });

        return deferredObject.promise;
    };

    var inviteUser = function (inviteObject) {

        var deferredObject = $q.defer();

        $http.post(
            '/Manager/Invitation', inviteObject
        ).
        success(function (data) {
            deferredObject.resolve(data);
        }).
        error(function () {
            deferredObject.resolve(data);
        });

        return deferredObject.promise;
    };

    var removeInvitation = function (user) {

        var deferredObject = $q.defer();

        $http.post(
            '/Manager/RemoveInvitation', user
        ).
        success(function (data) {
            deferredObject.resolve(data);
        }).
        error(function () {
            deferredObject.resolve(data);
        });

        return deferredObject.promise;
    };

    return {
        login: login,
        logoff: logoff,
        register: register,
        reset: reset,
        inviteUser: inviteUser,
        removeInvitation: removeInvitation,
        resetPasswordConfirmation: resetPasswordConfirmation
    }
};

UserFactory.$inject = ['$http', '$q'];