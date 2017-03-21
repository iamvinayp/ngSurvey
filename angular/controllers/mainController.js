//var myApp = angular.module('surveyApp', ['ngRoute']);

myApp.controller('mainController', ['$http','$location','$scope',function($http, $location, $scope) {

  var baseUrl = 'https://projectsapi.edwisor.com/api/surveys';

  $scope.surveys = [];

  $scope.getAllSurveys = function(){
        $http({
          method: 'GET',
          url: baseUrl+'/'
        }).then(function successCallBack(response){
            $scope.surveys = response.data.data;
            //console.log($scope.surveys);
        },
        function errorCallBack(response){
             alert("Some error occurred. Check the console.");
             //console.log(response);
        });
    }

    $scope.getAllSurveys();

  $scope.deleteSurvey = function(surveyId, index){
      var surveyData = {};
        $http({
          method: 'POST',
          data: surveyData,
          url: baseUrl + '/' + surveyId + '/delete'
        }).then(function successCallBack(response){
            alert("Survey deleted successfully");
            $scope.surveys.splice(index, 1);
            //console.log(response);
        },
        function errorCallBack(response){
             alert("Some error occurred. Check the console.");
             //console.log(response);
        });
    }

  }]);