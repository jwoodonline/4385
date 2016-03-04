var myModule = angular.module('AngularJSHomeWorkTwo', []);

//  $http.jsonp:from other server
//  $http.get from your server

myModule.controller('QuizController', ['$scope', '$http', 'getQuestionsService', 'getStudentsService','$rootScope','$window','LocalStorageService',
 function($scope, $http, getQuestionsService, getStudentsService, $rootScope, $window, LocalStorageService) {
  var qc = this;
  // latestdata = getdata and updatedata=  setdata
  
  qc.latestdata = function(){
   return qc.getData(qc.val);
  }
  
  qc.updatedata = function(){
   return qc.setData(qc.val);
  }

      qc.students_completed = [];
      qc.questions_completed = [];

  qc.getNextQuestion = function() {

   if (qc.questions.length > 0) {
    var index = Math.floor(Math.random() * qc.questions.length);

    qc.selected_questions = qc.questions[index];

    qc.questions_completed.push(qc.selected_questions);

    //read about splice here: http://www.w3schools.com/jsref/jsref_obj_array.asp
    qc.questions.splice(index, 1);
   }
   else {
    qc.questions = qc.questions_completed;
    qc.questions_completed = [];
   }

  }

  qc.getNextStudent = function() {

   if (qc.students.length > 0) {
    var index = Math.floor(Math.random() * qc.students.length);

    qc.selected_students = qc.students[index];

    qc.students_completed.push(qc.selected_students);

    qc.students.splice(index, 1);
   }
   else {
    qc.students = qc.students_completed;
    qc.students_completed = [];
   }
  }

  qc.getNext = function() {
   qc.getNextQuestion();
   qc.getNextStudent();
  }

  qc.doCorrect = function() {
   qc.selected_students.correct++;
   qc.getNext();
  }

  qc.doIncorrect = function() {
   qc.selected_students.incorrect++;
   qc.getNext();
  }


  qc.getQuestions = function() {


   getQuestionsService.getQuestions()
    .then(

     function(response) {
      console.log(response.data); //good way to debug
      qc.questions = response.data;
      ///$http.get is successful
      qc.getNextQuestion();
     },
     function(response) {
      ///$http.get unsuccessful
      console.log(response);
      qc.questions = [];
     }


    );
  }

  qc.getStudents = function() {

   getStudentsService.getStudents()
    .then(

     function(response) {
      console.log(response.data); //good way to debug
      qc.students = response.data;
      ///$http.get is successful
      qc.getNextStudent();
     },
     function(response) {
      ///$http.get unsuccessful
      console.log(response);
      qc.students = [];
     }


    );

  };
qc.getStudents();
qc.getQuestions();

}]);
////////////question service//////////
myModule.factory('getQuestionsService', ['$http', function($http) {

 var getQuestionsService = {};

 getQuestionsService.getQuestions = function() {
  return $http.get("questions.json");

 };

 return getQuestionsService;

}]);
/////////student service////////
myModule.factory('getStudentsService', ['$http', function($http) {

 var getStudentsService = {};

 getStudentsService.getStudents = function() {
  return $http.get("students.json");
 };

 return getStudentsService;

}]);

myModule.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(val) {
            $window.localStorage && $window.localStorage.setItem('my-storage', val);
            return this;
        },
        getData: function() {
            
            var val = $window.localStorage && $window.localStorage.getItem('my-storage');
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
});