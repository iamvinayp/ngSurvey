//var myApp = angular.module('surveyApp', ['ngRoute']);

myApp.controller('singleSurveyController', ['$http','$location','$routeParams','$scope',function($http, $location, $routeParams, $scope) {

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

  $scope.deleteSurvey = function(surveyId){
    var surveyData = {};
    $http({
      method: 'POST',
      data: surveyData,
      url: baseUrl + '/' + surveyId + '/delete'
    }).then(function successCallBack(response){
      alert("Survey deleted successfully");
      $location.path('/loadall');
            //console.log(response);
          },
          function errorCallBack(response){
           alert("Some error occurred. Check the console.");
          console.log(response);
           });
  }

  $scope.surveyqstns = [];

  $scope.getAllQuestions = function(){
    $http({
      method: 'GET',
      url: baseUrl + '/' + $routeParams.surveyId + '/questions/all'
    }).then(function successCallBack(response){
      $scope.surveyqstns = response.data.data;
      //$scope.surveyqstns = $scope.surveyqstnstemp.reverse();
            //console.log($scope.surveyqstns);
          },
          function errorCallBack(response){
           alert("Some error occurred. Check the console.");
             //console.log(response);
           });
  }

  $scope.editClick = '';

  $scope.editClicked = function(){
      $scope.editClick = 'true';
    }

  $scope.editQuestion = function(questionId, questionTextEdited){
    var questionData ={
      questionText : questionTextEdited
    };
    $http({
      method: 'PUT',
      data  : questionData,
      url: baseUrl + '/questions/' + questionId + '/edit'
    }).then(function successCallback(response) {
          $scope.editClick = '';
          alert("Question updated successfully");
          //$location.path('');
          //console.log(response);
        }, function errorCallback(response) {
          alert("some error occurred. Check the console.");
          console.log(response);
        });
  } //end edit Question

  $scope.deleteQuestion = function(questionId, index){
    var questionData = {};
    if(confirm("Are you sure to delete the question?")){
    $http({
      method: 'POST',
      data: questionData,
      url: baseUrl + '/questions/' + questionId + '/delete'
    }).then(function successCallBack(response){
      alert("Question deleted");
      $scope.surveyqstns.splice(index, 1);
      //$location.path('/loadall');
        },
        function errorCallBack(response){
         alert("Some error occurred. Check the console.");
         console.log(response);
        });
    }//end if
  }

  $scope.trackQuestionIndex = function(index){
    $scope.currentQuestionIndex = index;
    console.log("current question index:"+$scope.currentQuestionIndex);
  }

  $scope.optionData = {};

  $scope.addOptions = function(questionId, index){
    /*var optionData = {
      optionText :
    };*/
      //console.log(optionData);
      $http({
        method: 'POST',
        data  : $scope.optionData,
        url: baseUrl + '/questions/' + questionId + '/options/create'
      }).then(function successCallback(response) {
          alert("Option added");
          $scope.addOption = '';
          //questionOptions.push($scope.optionData.optionText);
          console.log(options);
          $location.path('/loadall');
        }, function errorCallback(response) {
          alert("Some error occurred. Check the console.");
          console.log(response);
        });
  }

  $scope.deleteOptions = function(questionId){

    $http({
      method : 'POST',
      url    : baseUrl + '/questions/' + questionId + '/options/delete'
    }).then(function successCallback(response) {
        alert("Deleted all options");
    }, function errorCallback(response) {
        alert("Some error occurred. Check the console.");
        console.log(response);
    });
  }

  $scope.deleteAnswers = function(questionId){
    $http({
      method : 'POST',
      url    : baseUrl + '/questions/' + questionId + '/answers/delete'
    }).then(function successCallback(response) {
        alert("Deleted all answers");
    }, function errorCallback(response) {
        alert("Some error occurred. Check the console.");
        console.log(response);
    });
  } // end deleteAnswers

}]);