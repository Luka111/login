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
var ajaxFunctionELogin = function(email,password){
	jQuery.ajax({
		type: 'GET',
		data: {email:email , password:password},
		dataType: 'json',
		url: 'http://localhost:8081/elogin' ,
		success: function (data) {
   			 var ret = data;
    			$('#msg').html(ret.msg);
		},
		error: function (xhr, status, error) {
    			 console.log('Error: ' + error.message);
   			 $('#msg').html('Error connecting to the server');
		}
	});
}

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

var ajaxFunctionCheckEmail = function(email){
	jQuery.ajax({
		type: 'GET',
		data: {email:email},
		dataType: 'json',
		url: 'http://localhost:8081/check_email' ,
		success: function (data) {
   			 var ret = data;
    			$('#msgcheckemail').html(ret.msg);
		},
		error: function (xhr, status, error) {
    			 console.log('Error: ' + error.message);
   			 $('#msgcheckemail').html('Error connecting to the server');
		}
	});
}

/*
*/

//CONTROLLER
function mainCtrl($scope,login){

  $scope.response = '';

	$scope.login = function(name,email,password){
		if ((name && password) || (email && password)){
			if($scope.nLogin){
				login(name,password,function success(data){
				      $scope.response = data.msg;
				    },function error(err){
				      console.log('error',err);
				    });
			}else{
				ajaxFunctionELogin(email,password);
			}
		}
	};

	$scope.eLogin = false;
	$scope.nLogin = true;

	$scope.emailLogin = function(){
		$scope.eLogin = true;
		$scope.nLogin = false;
	}

	$scope.nameLogin = function(){
		$scope.eLogin = false;
		$scope.nLogin = true;
	}

	$scope.signup = function(name,password,confirm_password,email){
		if(password){
			if(password.length > 7){
				if(password === confirm_password) ajaxFunctionSignup(name,password,email);
			}else{
				$scope.signupMsg = 'Your password must have at least 8 letters!';
			}
		}
	};

	$scope.checkPass = undefined;	

	$scope.checkPasswords = function(password,confirm_password){
		if(password.length > 7){
			if(password === confirm_password) {$scope.checkPass = true; $scope.checkMsg = 'Passwords match!'}
			else {$scope.checkPass = false; $scope.checkMsg = 'Passwords do not match'}
		}else{
			$scope.checkPass = false; $scope.checkMsg = 'Password must have at least 8 letters!';
		}
	};

	$scope.checkPasswords1 = function(password,confirm_password){
		if(password.length > 7){
			$scope.checkMsg = '';
			if(password === confirm_password) {$scope.checkPass = true;}
			else {$scope.checkPass = false;}
		}else{
			$scope.checkPass = false; $scope.checkMsg = 'Password must have at least 8 letters!';
		}
	};

	$scope.check = function(name){
		ajaxFunctionCheck(name);
	};

	$scope.checkEmail = function(email){
		if(email){
			ajaxFunctionCheckEmail(email);
		}
	};

	$scope.bSignup = false;
	
	$scope.showSignup = function(){
		$scope.bSignup = true;
	};

	$scope.hideSignup = function(){
		$scope.bSignup = false;
	};
	





}
