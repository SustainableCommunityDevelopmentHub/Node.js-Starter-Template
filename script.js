// load dependencies 
var express = require( 'express' ),	// import express module
	app = express(), // create new express application
	server = require( 'http' ).createServer( app ),	// create the server to listen for connections
	io = require( 'socket.io' ).listen( server ),	// listen for socket events
	ObjectId = require( 'mongodb' ).ObjectID,	// create ObjectId object to access the id within mongo collections
	databaseUrl = "mongodb://localhost:27017/chat", // specify database name here
	collections = [ "users" ], // specify collections within database here
	db = require( "mongojs" ).connect( databaseUrl, collections ); // create database object

server.listen( 1337 ); // the port to listen for connections on

app.use( express.static( __dirname + '/public' ) ); // a directory to hold all our static files

io.sockets.on( 'connection', function ( socket ) {	
	
	socket.on( 'connect', function ( data ) {
		console.log(data);
		io.sockets.socket( socket.id ).emit( 'id', { id: socket.id } );
	});

	socket.on( 'login', function ( data ) {
		addUser( data.id, data.username );
	});

	socket.on( 'message', function( data ) {
		console.log( data.msg, data.recipients, data.sender, data.timeStamp );
		sendMessage(data);
	});
	
	socket.on( 'disconnect', function( data ) {
		console.log( "User disconnected: " + socket.id );
		removeUser( socket.id );
	});
});


function addUser( id, user ) {
	db.users.insert( { 'userId' : id, 'user' : user }, function( err, record ) {		
		if( err ){
			console.log( err );
		}
		else {	
			console.log( 'Success: ', record );
			getAllUsers();
		}
	});
}

function getAllUsers(id) {	
	db.users.find( function( err, docs ) {		
		var users = [], i = 0;	
		for( ; i < docs.length; i++ ) {
			users.push( docs[i] );	  
		}
		if(err){
			console.log(err);
		}
		else{
			if(users.length === 0){
				console.log("No-one online!");
			}
			else {
				console.log("All users returned!");
				var disconnected = id ? id : 0;
				io.sockets.emit( 'onlineUsers', { users : users, disconnect : disconnected  } );
			}
		}		
		
	});
}

function removeUser( id ) {	
	db.users.remove( { 'userId' : id }, function( err, record ) {		
		if( err ){
			console.log( err );
		}
		else {
			console.log( 'User removed' );
			getAllUsers(id);
		}
	});
}

function sendMessage(data){
	var i = 0;
	if(data.recipients.length === 0){
		sendToAll(data);
	}
	else {
		for(; i < data.recipients.length; i++){
			if(data.recipients[i].name === "All Users"){
				sendToAll(data);
				return;
			}
		}
		sendToRecipients(data);
	}

	function sendToAll(data){
		io.sockets.emit( 'globalMsg', { msg : data.msg, time : data.timeStamp, sender : data.sender  } );
	}

	function sendToRecipients(data){
		var i = 0;
		for(; i < data.recipients.length; i++){
			console.log(data.recipients[i].id);
			io.sockets.socket( data.recipients[i].id ).emit( 'privateMsg', { msg: data.msg, recipients: data.recipients, sender : data.sender, time: data.timeStamp } );
		}
		// send also to original sender
		io.sockets.socket( data.sender.socket ).emit( 'privateMsg', { msg: data.msg, recipients: data.recipients, sender : data.sender, time: data.timeStamp } );
	}
}
	
