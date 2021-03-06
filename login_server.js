var connect = require('connect');
var mongo = require('mongodb');
var host = "127.0.0.1";
var port = mongo.Connection.DEFAULT_PORT;

//CREATING DB
var db = new mongo.Db("auth-db", new mongo.Server(host, port, {}));


//CHECKING IF USERNAME EXISTS
var check = function(req,res,next){
  var slashes = req._parsedUrl.pathname.split('/');
  if(!slashes[0]){
    slashes.splice(0,1);
  }
  if(slashes[0]==='check'){
	console.log('[CHECK] Request recived' + ' from ' + req.url);
	var lo = req.query;
	console.log('Object recivied ',lo);
	db.collection("user-collection",function(error,collection){
		console.log('Checking if ' + lo.name + ' exists in user-collection');
		collection.find({name:lo.name}, function(error,cursor){
			if(error){
				console.log('Error :' +error);
			}else{
				cursor.toArray(function(error,niz){
					if(niz.length){
						console.log(lo.name + ' exists in user-collection');
						console.log(JSON.stringify(niz));
						res.end(JSON.stringify({msg:'Username exists'}));
					}else{
						console.log(lo.name + ' does not exists in user-collection');
						res.end(JSON.stringify({msg:'Username does not exist'}));
					}
				});
			}
		});
	});
  }else{
    next();
  }
};

//CHECK-EMAIL
var check_email = function(req,res,next){
  var slashes = req._parsedUrl.pathname.split('/');
  if(!slashes[0]){
    slashes.splice(0,1);
  }
  if(slashes[0]==='check_email'){
	console.log('[CHECK_EMAIL] Request recived' + ' from ' + req.url);
	var lo = req.query;
	console.log('Object recivied ',lo);
	db.collection("user-collection",function(error,collection){
		console.log('Checking if ' + lo.email + ' exists in user-collection');
		collection.find({email:lo.email}, function(error,cursor){
			if(error){
				console.log('Error :' +error);
			}else{
				cursor.toArray(function(error,niz){
					if(niz.length){
						console.log(lo.email + ' exists in user-collection');
						console.log(JSON.stringify(niz));
						res.end(JSON.stringify({msg:'Email exists'}));
					}else{
						console.log(lo.email + ' does not exists in user-collection');
						res.end(JSON.stringify({msg:'Email does not exist'}));
					}
				});
			}
		});
	});
  }else{
    next();
  }
};

//LOGIN
var log_in = function(req,res,next){
  var slashes = req._parsedUrl.pathname.split('/');
  if(!slashes[0]){
    slashes.splice(0,1);
  }
  if(slashes[0]==='log_in'){
	console.log('[LOG_IN] Request recived' + ' from ' + req.url);
	var lo = req.query;
	console.log('Object recivied ',lo);
	db.collection("user-collection",function(error,collection){
		console.log('Checking if ' + lo.name + ' exists in user-collection');
		collection.find({name:lo.name}, function(error,cursor){
			if(error){
				console.log('Error :' +error);
			}else{
				cursor.toArray(function(error,niz){
					if(niz.length){
						console.log(lo.name + ' exists in user-collection');
						console.log(JSON.stringify(niz));
						console.log(niz[0].password + ' AND ' + lo.password);
						if (niz[0].password === lo.password){
							res.end(JSON.stringify({msg:'You have successfully logged in'}));
						}else{
							res.end(JSON.stringify({msg:'Wrong Password!'}));		
						}
					}else{
						console.log(lo.name + ' does not exists in user-collection');
						res.end(JSON.stringify({msg:'Username does not exist, check spelling!'}));
					}
				});
			}
		});
	});
  }else{
    next();
  }
};
//E-LOGIN
var elogin = function(req,res,next){
  var slashes = req._parsedUrl.pathname.split('/');
  if(!slashes[0]){
    slashes.splice(0,1);
  }
  if(slashes[0]==='elogin'){
	console.log('[ELOGIN] Request recived' + ' from ' + req.url);
	var lo = req.query;
	console.log('Object recivied ',lo);
	db.collection("user-collection",function(error,collection){
		console.log('Checking if ' + lo.email + ' exists in user-collection');
		collection.find({email:lo.email}, function(error,cursor){
			if(error){
				console.log('Error :' +error);
			}else{
				cursor.toArray(function(error,niz){
					if(niz.length){
						console.log(lo.email + ' exists in user-collection');
						console.log(JSON.stringify(niz));
						console.log(niz[0].password + ' AND ' + lo.password);
						if (niz[0].password === lo.password){
							res.end(JSON.stringify({msg:'You have successfully logged in'}));
						}else{
							res.end(JSON.stringify({msg:'Wrong Password!'}));		
						}
					}else{
						console.log(lo.email + ' does not exists in user-collection');
						res.end(JSON.stringify({msg:'Email does not exist, check spelling!'}));
					}
				});
			}
		});
	});
  }else{
    next();
  }
};

//SIGN-UP
var signup = function(req,res,next){
  var slashes = req._parsedUrl.pathname.split('/');
  if(!slashes[0]){
    slashes.splice(0,1);
  }
  if(slashes[0]==='signup'){
	console.log('[SIGNUP] Request recived' + ' from ' + req.url);
	var lo = req.query;
	console.log('Object recivied ',lo);
	db.collection("user-collection",function(error,collection){
		console.log('Checking if ' + lo.name + ' exists in user-collection');
		collection.find({name:lo.name}, function(error,cursor){
			if(error){
				console.log('Error :' + error);
			}else{
				cursor.toArray(function(error,niz){
					if(niz.length){
						console.log(lo.name + ' exists in user-collection');
						res.end(JSON.stringify({msg:'Username already exists, please chose another one'}));
					}else{
						console.log(lo.name + ' [USABLE] does not exists in user-collection');
						collection.find({email:lo.email},function(error,cursor){
							if(error){
								console.log('Error :' + error);
							}else{
								cursor.toArray(function(error,niz_email){
									if(niz_email.length){
										console.log(lo.email + ' exists in user-collection');
										res.end(JSON.stringify({msg:'Email already exists, please chose another one'}));
									}else{
										collection.insert(lo);
										console.log(lo + ' Inserted into DB');
										res.end(JSON.stringify({msg:'You have created your account!'}));
									}
								});
							}
						});
					}
				});
			}
		});
	});
  }else{
    next();
  }
};

//INIT SERVER
db.open(function(error){
var login = connect().
  use(connect.query()).
  use(check).
  use(check_email).
  use(log_in).
  use(elogin).
  use(signup).
  use(connect.static('/home/luka/Work/login')).
  listen(8081);
});
