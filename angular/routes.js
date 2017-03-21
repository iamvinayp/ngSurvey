//var myApp = angular.module('surveyApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/home',{
            // location of the template
        	templateUrl		: 'views/home-view.html',
        	// Which controller it should use
        })
        .when('/about',{
            templateUrl     : 'views/about-view.html',
            controller      : 'aboutSurveyController'
        })
        .when('/create',{
            templateUrl     : 'views/createsurvey-view.html',
            controller      : 'surveyCreateController'
        })
        .when('/loadall',{
            templateUrl     : 'views/loadall-view.html',
            controller      : 'mainController'
        })
        .when('/:surveyId',{
            templateUrl     : 'views/singlesurvey-view.html',
            controller      : 'singleSurveyController'
        })
        .when('/:surveyId/question/create', {
            templateUrl     : 'views/createquestion-view.html',
            controller      : 'questionCreateController'
        })
        .when('/:surveyId/edit',{
            templateUrl     : 'views/editsurvey-view.html',
            controller      : 'editSurveyController'
        })
        /*.when('/questions/:questionId/edit',{
            templateUrl     : 'views/editquestion-view.html',
            controller      : 'questionCreateController'
        })*/
        .when('/:surveyId/poll', {
            templateUrl     : 'views/userpoll-view.html',
            controller      : 'userPollController'
        })
        .otherwise(
            {
                redirectTo:'/home'
                //template   : '<h1>404 page not found</h1>'
            });
}]);