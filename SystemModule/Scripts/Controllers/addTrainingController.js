﻿function addTrainingController($scope, $rootScope, $http, $element, $modal, UserFactory, UtilitiesFactory) {
    $scope.viewModel = {};
    $scope.imageMessage = '';
    $scope.markMessage = '';

    //Used to display the data 
    $scope.loadData = function () {

        UtilitiesFactory.showSpinner();
        $scope.viewModel.ActionType = 5;
        $http.post('/api/Training/', $scope.viewModel)
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
                messageText: 'Wystąpił nieoczekiwany błąd podczas inicjalizacji danych'
            });

            UtilitiesFactory.hideSpinner();
        });
    }

    $scope.loadData();

    $scope.loadImage = function (item) {
        $scope.$apply(function (scope) {
            var file = $element[0].getElementsByClassName('upload-image')[0].files[0];

            if (!checkExtension(file)) {
                $scope.imageMessage = 'Plik może być w formacie JPG, JPEG, PNG, GIF lub BMP.';
                return;
            }

            if ($scope.viewModel.Current.TrainingResources) {
                deleteFile($scope.viewModel.Current.TrainingResources);
            }

            var statusBar = $('.statusBar').eq(0);

            checkImageArtibutesAndUpload(file, 350, 250, 250, false, statusBar);
        });
    }

    $scope.loadIcon = function (item) {
        $scope.$apply(function (scope) {
            var file = $element[0].getElementsByClassName('upload-mark')[0].files[0];

            if (!checkExtension(file)) {
                $scope.markMessage = 'Plik może być w formacie JPG, JPEG, PNG, GIF lub BMP.';
                return;
            }

            if ($scope.viewModel.Current.PassResources) {
                deleteFile($scope.viewModel.Current.PassResources);
            }

            var statusBar = $('.statusBarMark').eq(0);

            checkImageArtibutesAndUpload(file, 150, 150, 150, true, statusBar);
        });
    }

    function checkImageArtibutesAndUpload(file, maxSize, maxWidth, maxHeight, marks, statusBar)
    {
        $scope.fileName = file.name;
        var size = ~~(file.size / 1024);

        if (size > maxSize) {
            if (marks) {
                $scope.markMessage = 'Wielkość pliku nie może przekraczać ' + maxSize + 'KB';
            }
            else {
                $scope.imageMessage = 'Wielkość pliku nie może przekraczać ' + maxSize + 'KB';
            }
        }

        var img = new Image();

        img.src = window.URL.createObjectURL(file);

        if (marks) {
            $scope.markMessage = 'Wczytana grafika musi mieć wymiary ' + maxWidth + ' x ' + maxHeight + ' px';
        }
        else {
            $scope.imageMessage = 'Wczytana grafika musi mieć wymiary ' + maxWidth + ' x ' + maxHeight + ' px';
        }

        img.onload = function () {
            var width = img.naturalWidth,
                height = img.naturalHeight;

            window.URL.revokeObjectURL(img.src);
            

            if (width == maxWidth && height == maxHeight) {
                var fd = new FormData();
                fd.append('file', file);
                if (marks) {
                    sendFileToServer(fd, new createMarkStatusbar(statusBar || $element[0].getElementsByClassName('statusBarMark')), marks);
                } else {
                    sendFileToServer(fd, new createStatusbar(statusBar || $element[0].getElementsByClassName('statusBar')), marks);
                }
            }
            else {
                if (marks) {
                    $scope.markMessage = 'Wczytana grafika musi mieć wymiary ' + maxWidth + ' x ' + maxHeight + 'px';
                }
                else {
                    $scope.imageMessage = 'Wczytana grafika musi mieć wymiary ' + maxWidth + ' x ' + maxHeight + 'px';
                }
                $scope.fileName = '';
                return;
            }
        };
    }

    $scope.showIcon = function () {
        var modalInstance = $modal.open({
            templateUrl: '/Templates/Modals/commonMarksModal.html',
            controller: 'commonMarksModalController',
            size: 'sm',
            resolve: {
                selectedMark: function () {
                    return $scope.selectedMark;
                }
            }
        });

        modalInstance.result.then(function (selectedMark) {
            if (!!selectedMark) {
                $scope.viewModel.Current.PassResources = selectedMark;
            }
        });
    }

    function checkExtension(file) {
        if (!file) {
            return;
        }

        var availableExtension = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

        var fileNameParts = file.name.split('.');
        var extension = fileNameParts[fileNameParts.length - 1];
        return availableExtension.indexOf(extension) !== -1;
    }

    function sendFileToServer(formData, status, marks) {
        var uploadURL = ""; //Upload URL

        uploadURL = "./Upload/UploadImage";

        var extraData = {}; //Extra Data.
        var jqXHR = $.ajax({
            xhr: function () {
                var xhrobj = $.ajaxSettings.xhr();
                if (xhrobj.upload) {
                    xhrobj.upload.addEventListener('progress', function (event) {
                        var percent = 0;
                        var position = event.loaded || event.position;
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        //Set progress
                        status.setProgress(percent);
                    }, false);
                }
                return xhrobj;
            },
            url: uploadURL,
            type: "POST",
            contentType: false,
            processData: false,
            cache: false,
            data: formData,
            success: function (data) {
                if (data.Succeeded) {

                    if (marks) {
                        $scope.markMessage = 'Plik został pomyślnie wczytany.';
                        $scope.viewModel.Current.PassResources = $scope.fileSrc = data.Message;
                    }
                    else {
                        $scope.imageMessage = 'Plik został pomyślnie wczytany.';
                        $scope.viewModel.Current.TrainingResources = $scope.fileSrc = data.Message;
                    }

                    $scope.$apply();
                }
                else {

                    if (marks) {
                        $scope.markMessage = 'Plik nie mógł zostać wczytany - spróbuj ponownie później.';
                    }
                    else {
                        $scope.imageMessage = 'Plik nie mógł zostać wczytany - spróbuj ponownie później.';
                    }
                }

                status.hide();
            },
            error: function () {
                $scope.imageMessage = 'Plik nie mógł zostać wczytany ­ spróbuj ponownie później.';

                if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                    $scope.$apply();
                }

                status.hide();
            }
        });
    }

    function createStatusbar(obj) {

        $(obj).html('');
        $(obj).show();

        this.progressBar = $("<div class='progressBar'><div></div></div>");

        $(obj).append(this.progressBar);

        this.setProgress = function (progress) {
            var progressBarWidth = progress * this.progressBar.width() / 100;
            this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");

            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }
        }

        this.hide = function () {
            $(obj).hide();
        }
    }

    function createMarkStatusbar(obj) {

        $(obj).html('');
        $(obj).show();

        this.progressBar = $("<div class='progressBarMark'><div></div></div>");

        $(obj).append(this.progressBar);

        this.setProgress = function (progress) {
            var progressBarWidth = progress * this.progressBar.width() / 100;
            this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");

            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }
        }

        this.hide = function () {
            $(obj).hide();
        }
    }

    function deleteFile(fileName) {
        var deleteURL = ""; //Upload URL
        deleteURL = "./Upload/DeleteImage";

        $scope.fileName = undefined;
        $scope.fileSrc = undefined;

        $http.post(
            deleteURL, {
                FileName: fileName
            }
        );
    }

    $scope.save = function () {
        //check conditions
        var isValid = true;
        $scope.viewModel.ErrorMessage = '';

        if (!$scope.viewModel.Current.Name || $scope.viewModel.Current.Name.length < 5) {
            $scope.viewModel.ErrorMessage += "Nazwa szkolenia musi zawierać miniumum 5 znaków! <br> ";
            isValid = false;
        }

        if (!$scope.viewModel.Current.Description || $scope.viewModel.Current.Description.length < 5) {
            $scope.viewModel.ErrorMessage += "Opis szkolenia musi zawierać miniumum 5 znaków! <br> ";
            isValid = false;
        }

        if (!$scope.viewModel.Current.PassInfo || $scope.viewModel.Current.PassInfo.length < 5) {
            $scope.viewModel.ErrorMessage += "Komunikat po zaliczeniu szkolenia musi zawierać miniumum 5 znaków! <br> ";
            isValid = false;
        }

        if (!$scope.viewModel.Current.PassResources) {
            $scope.viewModel.ErrorMessage += "Brakuje odznaki za zaliczenie szkolenia! Wczytaj własna lub wybierz jedną z listy domyślnych w sekcjii informacji o szkoleniu <br> ";
            isValid = false;
        }

        if (!$scope.viewModel.Details || $scope.viewModel.Details.length === 0) {
            $scope.viewModel.ErrorMessage += "Szkolenie jest puste! Dodaj przynajmniej jeden element w sekcji Zawartość szkolenia <br> ";
            isValid = false;
        }

        if ($scope.viewModel.Details.length > 20) {
            $scope.viewModel.ErrorMessage += "Szkolenie zawiera zbyt wiele elementów! Usuń nadmiar, by zostało ich 20. <br> ";
            isValid = false;
        }

        if (!isValid) {
            $rootScope.$broadcast('showGlobalMessage', {
                success: false,
                messageText: $scope.viewModel.ErrorMessage
            });
            return;
        }

        UtilitiesFactory.showSpinner();
        $scope.viewModel.ActionType = 3;


        $http.post('/api/Training/', $scope.viewModel)
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
        .error(function (data) {
            if (!data) {
                $scope.viewModel.ErrorMessage = 'Wystąpił nieoczekiwany błąd podczas zapisu szkolenia';
            }
            else {
                $scope.viewModel.ErrorMessage = data.Message;
            }

            $rootScope.$broadcast('showGlobalMessage', {
                success: true,
                messageText: $scope.viewModel.ErrorMessage
            });

            UtilitiesFactory.hideSpinner();
        });
    }

    $scope.showOrganization = function()
    {
        var modalInstance = $modal.open({
            templateUrl: '/Templates/Modals/organizationModal.html',
            controller: 'organizationModalController',
            size: 'sm',
            resolve: {
                selectedOrganization: function () {
                    return $scope.viewModel.Organizations;
                }
            }
        });

        modalInstance.result.then(function (selectedOrganization) {
            if (!!selectedOrganization) {
                $scope.viewModel.Organizations = selectedOrganization;
                
                var isNotSelected = selectedOrganization.length == 0;
                $scope.viewModel.AvailableForAll = isNotSelected;
                $scope.selectAll(isNotSelected);
            }
        });
    }

    $scope.remove = function (resources, isMainResources) {
        if (!resources) {
            return;
        }

        $scope.markMessage = '';
        $scope.imageMessage = '';

        if (isMainResources) {
            if (resources.indexOf("Assets\\Image") == -1) {
                deleteFile(resources);
                $scope.viewModel.Current.TrainingResources = "Assets\\Image\\main_image.png";
                resources = "Assets\\Image\\main_image.png";
            }

            var input = $("#idTrainingImageInput");
            if (!!input) {
                input.replaceWith(input.val('').clone(true));
            }
        }
        else {
            if (resources.indexOf("Assets\\Marks") == -1) {
                deleteFile(resources);
            }
            $scope.viewModel.Current.PassResources = "";
            resources = "";

            var input = $("#idTrainingMarkInput");

            if (!!input) {
                input.replaceWith(input.val('').clone(true));
            }
        }
    }

    $scope.selectAll = function (isAll) {
        if (isAll) {
            if (!$scope.viewModel.Organizations) {
                return;
            }

            $scope.viewModel.Organizations.length = 0;
        }
        else {
            $scope.viewModel.Current.IsForAll = false;
        }
    }
}

addTrainingController.$inject = ['$scope', '$rootScope', '$http', '$element', '$modal', 'UserFactory', 'UtilitiesFactory'];