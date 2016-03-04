 
 
 myModule.controller('QuizController', ['$scope', 'getQuestions', function($scope, getQuestions) {
           
     
  
 }]);
 factory('getQuestions' , [ , function(){
  
  var questions = [];
  
  return function(questions)
  {
   
    questions.push(
    {"questions":[
    {"question":"who am I", "answer":"Bart"},
    {"question":"what does json stand for", "answer":"javascript object notation"},
    {"question":"do you like tacos", "answer":"yes"}
]}
     
     );
   
  };
  
 }]);