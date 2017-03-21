//var myApp = angular.module('surveyApp', ['ngRoute']);

myApp.controller('editSurveyController',['$http','$routeParams','$location','$scope',function($http, $routeParams, $location, $scope) {

  var baseUrl = 'https://projectsapi.edwisor.com/api/surveys';

  $scope.getCurrentSurvey = function(){
      $http({
        method: 'GET',
        url: baseUrl + '/' + $routeParams.surveyId
      }).then(function successCallback(response) {
          //console.log(response);
          $scope.survey = response.data.data;
          //console.log($scope.survey);

          $scope.surveyTitle = $scope.survey.surveyTitle;
          $scope.surveySubtitle = $scope.survey.surveySubtitle;
          $scope.instructions = $scope.survey.instructions;

        }, function errorCallback(response) {
          alert("some error occurred. Check the console.");
          console.log(response);
        });
  }  //end get current survey

  $scope.editCurrentSurvey = function(){

      var surveyData = {
        surveyTitle    : $scope.surveyTitle,
        surveySubtitle : $scope.surveySubtitle,
        instructions   : $scope.instructions
      };
      //console.log(surveyData);
      $http({
        method: 'PUT',
        data  : surveyData,
        url: baseUrl + '/' + $routeParams.surveyId + '/edit'
      }).then(function successCallback(response) {
          //console.log(response);
          alert("Survey updated successfully");
          //console.log(response.data);
          $location.path('/' + $routeParams.surveyId);
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });

  }// end editcurrent survey

}]); // end controller