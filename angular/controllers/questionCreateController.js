//var myApp = angular.module('surveyApp', ['ngRoute']);

myApp.controller('questionCreateController',['$http','$location','$routeParams','$scope',function($http, $location, $routeParams, $scope) {

  var baseUrl = 'https://projectsapi.edwisor.com/api/surveys';

  $scope.createQuestion = function(){

      var questionData = {
          questionText   : $scope.questionText
      };

      //console.log(questionData);

      $http({
        method: 'POST',
        data  : questionData,
        url: baseUrl + '/' + $routeParams.surveyId + '/question/create'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          alert("Question added successfully");
          $location.path('/' + $routeParams.surveyId);

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("Some error occurred. Check the console.");
          console.log(response);
        });

  }// end createQuestion

}]); // end controller