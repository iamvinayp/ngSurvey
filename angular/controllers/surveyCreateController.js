//var myApp = angular.module('surveyApp', ['ngRoute']);

myApp.controller('surveyCreateController',['$http','$location','$scope',function($http, $location, $scope) {

  var baseUrl = 'https://projectsapi.edwisor.com/api/surveys';

  $scope.createSurvey = function(){

      var surveyData = {

          surveyTitle       : $scope.title,
          surveySubtitle    : $scope.subtitle,
          instructions      : $scope.description
      };

      //console.log(surveyData);

      $http({

        method: 'POST',
        data  : surveyData,
        url: baseUrl + '/create'

      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          alert("Survey created successfully");
          $location.path('/home');

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("Some error occurred. Check the console.");
          console.log(response);
        });

  }// end load all surveys

}]); // end controller