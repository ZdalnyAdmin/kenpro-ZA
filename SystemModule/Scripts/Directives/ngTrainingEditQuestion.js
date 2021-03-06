﻿window.App
.directive('ngTrainingEditQuestion', [function () {
    return {
        scope: { questions: '=' },
        restrict: 'A',
        replace: 'true',
        templateUrl: 'Templates/trainingEditQuestion.html',
        controller: ['$scope', function ($scope) {
            $scope.editableQuestion = {};

            $scope.up = function (question) {
                $scope.questions = changePosition($scope.questions, question, false);
            }

            $scope.down = function (question) {
                $scope.questions = changePosition($scope.questions, question, true);
            }

            $scope.edit = function (question) {
                $scope.editableQuestion = angular.copy(question);
                question.isEdit = true;
            }

            $scope.delete = function (question) {
                for (var i = 0; i < $scope.questions.length; i++) {
                    if ($scope.questions[i] == question) {
                        index = i;
                        break;
                    }
                }
                $scope.questions.splice(index, 1);
            }

            $scope.save = function (question) {
                $scope.ErrorMessage = '';
                var isValid = true;

                if (!question.Text || question.Text.length < 10) {
                    $scope.ErrorMessage += "Brak treści pytanie";
                    isValid = false;
                }


                var checkScore = false;
                var checkAnswerCount = 0;

                angular.forEach(question.Answers, function (val) {
                    if (!!val.Text && val.Text.length > 0) {
                        checkAnswerCount++;
                        if (!!val.Score && val.Score > 0 && val.Score < 100) {
                            checkScore = true;
                        }
                    }

                    if (!!val.Score && val.Score < 0 || val.Score > 100) {
                        isValid = false;
                    }

                });

                if (!checkScore) {
                    $scope.ErrorMessage += "Przy najmniej jedna odpowiedź musi być prawidłowa - wyznacz za nią punkty! <br> ";
                    isValid = false;
                }

                if (checkAnswerCount < 2 && (question.Type === 0 || question.Type === 1)) {
                    $scope.ErrorMessage += "Wpisz przy najmniej 2 odpowiedzi na pytanie! <br>";
                    isValid = false;
                }

                if (checkAnswerCount < 1 && question.Type === 2) {
                    $scope.ErrorMessage += "Przy najmniej jedna odpowiedź musi być prawidłowa - wyznacz za nią punkty! <br>";
                    isValid = false;
                }

                if (!isValid) {
                    return;
                }




                $scope.editableQuestion = {};
                question.isEdit = false;
            }

            $scope.cancel = function (question) {
                question.Text = $scope.editableQuestion.Text;
                question.Answers = $scope.editableQuestion.Answers;
                $scope.editableQuestion = {};
                question.isEdit = false;
            }

            $scope.addAnswer = function (item) {
                if (!item.Answers) {
                    item.Answers = [];
                }


                if (item.Answers.length > 6) {
                    $scope.ErrorMessage = "Maksymalnie moze byc 6 odpowiedzi";
                    return;
                }

                item.Answers.push(createAnswer());
            }

            $scope.removeAnswer = function (item, answer) {

                if (!item.Answers) {
                    item.Answers = [];
                }

                var index = 0;
                for (var i = 0; i < item.Answers.length; i++) {
                    if (item.Answers[i] == answer) {
                        index = i;
                        break;
                    }
                }
                //delete element from list
                item.Answers.splice(index, 1);
            }

            changePosition = function (list, currentItem, up) {
                if (!list || !list.length) {
                    return;
                }
                var index = 0;
                for (var i = 0; i < list.length; i++) {
                    if (list[i] == currentItem) {
                        index = i;
                        break;
                    }
                }
                //delete element from list
                list.splice(index, 1);
                if (up) {
                    index++;
                }
                else {
                    index--;
                }

                var temp = [];
                //add on first position
                if (index <= 0) {
                    temp.push(currentItem);
                    angular.forEach(list, function (item) {
                        temp.push(item);
                    });
                    return temp;
                }
                //add for last position
                if (index >= list.length) {

                    angular.forEach(list, function (item) {
                        temp.push(item);
                    });
                    temp.push(currentItem);
                    return temp;
                }
                //change position
                for (var i = 0; i < list.length; i++) {
                    if (i == index) {
                        temp.push(currentItem);
                    }
                    temp.push(list[i]);
                }
                return temp;
            }

        }]
    };
}]);