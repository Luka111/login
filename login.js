angular.module('HERSLogin',['ngAnimate']).
  factory('login',function($http){
    return function(name,password,cb,errorcb){
      $http({
        method: 'GET',
        params: {name:name, password:password},
        url: 'http://localhost:8081/log_in'}).
        success(cb).
        error(errorcb);
    };
  });

//FUNCTIONS - LATER TO FACTORY
var ajaxFunctionLogin = function(name,password){
};

var ajaxFunctionSignup = function(name,password,email){
	jQuery.ajax({
		type: 'GET',
		data: {name:name , password:password, email:email},
		dataType: 'json',
		url: 'http://localhost:8081/signup' ,
		success: function (data) {
   			 var ret = data;
    			$('#msgsignup').html(ret.msg);
		},
		error: function (xhr, status, error) {
    			 console.log('Error: ' + error.message);
   			 $('#msgsignup').html('Error connecting to the server');
		}
	});
}

var ajaxFunctionCheck = function(name){
	jQuery.ajax({
		type: 'GET',
		data: {name:name},
		dataType: 'json',
		url: 'http://localhost:8081/check' ,
		success: function (data) {
   			 var ret = data;
    			$('#msgcheck').html(ret.msg);
		},
		error: function (xhr, status, error) {
    			 console.log('Error: ' + error.message);
   			 $('#msgcheck').html('Error connecting to the server');
		}
	});
}

/*
*/

//CONTROLLER
function mainCtrl($scope,login){

  $scope.response = '';

	$scope.login = function(name,password){
		if(name && password) login(name,password,function success(data){
      $scope.response = data.msg;
    },function error(err){
      console.log('error',err);
    });
	};

	$scope.signup = function(name,password,confirm_password,email){
		if(password === confirm_password) ajaxFunctionSignup(name,password,email);
	};

	$scope.checkPass = undefined;	

	$scope.checkPasswords = function(password,confirm_password){
		if(password === confirm_password) {$scope.checkPass = true; $scope.checkMsg = 'Passwords match!'}
		else {$scope.checkPass = false; $scope.checkMsg = 'Passwords do not match'}
	};

	$scope.checkPasswords1 = function(password,confirm_password){
		if(password === confirm_password) {$scope.checkPass = true;}
		else {$scope.checkPass = false;}
	};

	$scope.check = function(name){
		ajaxFunctionCheck(name);
	};

	$scope.bSignup = false;
	
	$scope.showSignup = function(){
		$scope.bSignup = true;
	};

	$scope.hideSignup = function(){
		$scope.bSignup = false;
	};
	





}
