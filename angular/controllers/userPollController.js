//var myApp = angular.module('surveyApp', ['ngRoute']);

myApp.controller('userPollController', ['$http','$location','$routeParams','$scope',function($http, $location, $routeParams, $scope) {

  var baseUrl = 'https://projectsapi.edwisor.com/api/surveys';

  $scope.loadSingleSurvey = function(){
    $http({
      method: 'GET',
      url: baseUrl + '/' + $routeParams.surveyId
    }).then(function successCallBack(response){
      $scope.survey = response.data.data;
            //console.log($scope.survey);
            $scope.surveyTitle = $scope.survey.surveyTitle;
            $scope.surveySubtitle = $scope.survey.surveySubtitle;
            $scope.instructions = $scope.survey.instructions;
          },
          function errorCallBack(response){
           alert("Some error occurred. Check the console.");
             //console.log(response);
           });
    $scope.getAllQuestions();
  }

  $scope.surveyqstns = [];

  $scope.getAllQuestions = function(){
    $http({
      method: 'GET',
      url: baseUrl + '/' + $routeParams.surveyId + '/questions/all'
    }).then(function successCallBack(response){
      $scope.surveyqstns = response.data.data;
            //console.log($scope.surveyqstns);
          },
          function errorCallBack(response){
           alert("Some error occurred. Check the console.");
             //console.log(response);
           });
  }

  $scope.currentQuestionIndex = 0;

  $scope.trackQuestionIndex = function(index){
    $scope.currentQuestionIndex = index + 1;
  }

  $scope.selectdOption = ' ';
  $scope.selectedOption = function (index){
    $scope.selectdOption = index + 1;
  }

  $scope.createAnswer = function (questionId){
    if($scope.selectdOption !== ' '){
        var selectedOptionData ={
            selectedOptionNumber : $scope.selectdOption
        }
        console.log(selectedOptionData);
        $http({
            method  : 'POST',
            data    : selectedOptionData,
            url     : baseUrl + '/questions/' + questionId + '/answer/create'
        }).then(function successCallBack(response){
            $scope.currentQuestionIndex += 1;
            console.log(response);
        }, function errorCallBack(response){
            alert("Some error occurred. Check the console.");
            console.log(response);
        });
    } // end if
    else {
        alert("Select something please!");
    }
  }// end createAnswer

  $scope.skipAnswer = function(){
    var selectedOptionData ={
            selectedOptionNumber : 0
        }

        $http({
            method  : 'POST',
            data    : selectedOptionData,
            url     : baseUrl + '/questions' + questionId + '/answer/create'
        }).then(function successCallBack(response){
            console.log(response);
        }, function errorCallBack(response){
            alert("Some error occurred. Check the console.");
            console.log(response);
        });
  }
}]); // end userPollController