(function(){

	// View model for this app
	function ViewModel( webSocket ) {

		// Class to represent a user
		function User( name, id ) {
		    this.name = name;
		    this.id = id;
		}

		// Class to represent a recipient for the message
		function Recipient( name, id ) {
			this.name = name;
		    this.id = id;
		}

		// Class to represent new message
		function Message( from, to, msg, time ) {
			this.from = from;
			this.to = to;
			this.msg = msg;
			this.time = time;
		}

		// reference the viewModel
		var self = this;

	    // array to hold usersonline
	    self.users = ko.observableArray([]);

	    // array to hold array of recipients to send message to
	    self.recipients = ko.observableArray([]);

	    // array to hold messages
	    self.messages = ko.observableArray([]);

	    // boolean to test if a user has logged in i.e. entered a username
	    self.userOnline = ko.observable( false );
	    self.userNotOnline = ko.observable( true );
	    self.userUpdate = ko.observable( "No users online" );

	    // socket id and username
	    self.userName = ko.observable("");
	    self.socket = ko.observable( webSocket );

	    // add user and hide username input
	    self.addUser = function(){
	    	if( self.userName().length >= 3 && self.userName().length < 15 ) {
	    		socket.emit( 'login', { id : self.socket(), username : self.userName() } );
	    		self.userOnline( true );
	    		self.userNotOnline( false );
	    		self.userUpdate( "You are now online!" );
	    	}
	    	else {
	    		alert( "Please enter a username between 3-15 characters!" );
	    	}		
	    };


	    // add recipients
	    self.addRecipients = function() {

			// no more than 5 individual recipients per message
	    	if( self.recipients().length < 6 ) {
	    		var select = document.getElementById( "recipientSelect" );
	    		var name = select.options[ select.selectedIndex ].innerText,
	    			id = select.options[ select.selectedIndex ].value,
	    			present = false;

		    	// check that user is not already present in recipient ist
		    	// and that user is not adding themselves as a recipient
		    	if( self.recipients().length > 0 ) {
		    		for( var i = 0; i < self.recipients().length; i++ ) {
			    		if( self.recipients()[i].name == name || self.userName() == name ) {
			    			present = true;
			    		}
			    	}
			    	if( present === false ) {
			    		self.recipients.push(
					    	new Recipient( name, id )
					    );
			    	}
		    	}
		    	else{
		    		// if not present then add to recipients array
		    		if( name != self.userName() ) {
		    			self.recipients.push(
			    			new Recipient( name, id )
			    		);
		    		}
		    	}	
	    	}
	    	    	
	    };


	    // remove from recipient list
	    self.removeRecipients = function( data ) {
	    	// manually remove user
			var c = confirm( 'Remove recipient?' );
			if( c === true ) self.recipients.remove( data );
	    };


	    // show users online
	    self.showOnlineUsers = function( data ) {
	    	self.users.removeAll();
	    	var i = 0;
		    for( ; i < data.users.length; i++ ) {
		    	var user = data.users[i].user;
		    	var id = data.users[i].userId;
		 		self.users.push( new User( user, id ) );
		    }	
		    // if a user has disconnected remove them from the recipients list if they're there    
		    if( data.disconnect != 0 ) {
		    	self.userUpdate( "A user has disconnected!" );
		    	for( var i = 0; i < self.recipients().length; i++ ) {
	    			if( self.recipients()[i].id == data.disconnect ) {
	    				self.recipients.remove( self.recipients()[i] );
	    			}
	    		}
		    }
		    else {
		    	self.userUpdate( "A new user has come online!" );
		    }
	    };


	    // send message
	    self.sendMessage = function() {
	    	var msg = document.getElementById( 'msg' );
	    	if(msg.value === ""){
	    		alert( 'Please enter a message' );
	    	}
	    	else {
	    		var sender = {
	    			username : self.userName(),
	    			socket : self.socket()
	    		}
	    		socket.emit( 'message', { msg : msg.value, recipients : self.recipients(), sender : sender, timeStamp : self.getTime() } );
	    		msg.value = "";
	    		msg.focus();
	    		var update = document.getElementById( 'msgUpdate' );
	    		update.innerText = "Message Sent!";
	    		setTimeout( function() {
	    			update.innerText = "Click to send a message";
	    		}, 3000);
	    	}   	 
	    };


	    // get timestamp for message
	    self.getTime = function() {
		    var now     = new Date(); 
		    var hour    = now.getHours(),
		    	minute  = now.getMinutes(),
		    	second  = now.getSeconds(); 
		    if( hour.toString().length == 1 ) hour = '0'+ hour;
		    if( minute.toString().length == 1 ) minute = '0' + minute;
		    if( second.toString().length == 1 ) second = '0' + second;    
		    return hour + ':' + minute + ':' + second;
		}


		// inform user a new message has come online
		self.newMsg = function() {
			var m = document.getElementById( 'newMessageText' );
			m.innerText = "You have a new message!";
			setTimeout(function(){
				m.innerText = "";
			}, 3000);
		}


	    // socket receiving updates on amount of users online
	    socket.on( 'onlineUsers', function ( data ) {
		    self.showOnlineUsers( data );
		});


		// socket receiving global message i.e. to all users
		socket.on( 'globalMsg', function ( data ) {
			self.messages.push( new Message( data.sender.username, 'All', data.msg, data.time ) );
			self.newMsg();
		});


		// socket receiving private messages
		socket.on( 'privateMsg', function ( data ) {
			var i = 0, sendTo = "";
			for(; i < data.recipients.length - 1; i++) {
				sendTo += data.recipients[i].name + ', ';
			}
			sendTo += data.recipients[ length ].name;
			self.messages.push(
				new Message( data.sender.username, sendTo, data.msg, data.time )
			);
			self.newMsg();
		});

	}

	//connect to socket on server
	var socket = io.connect( 'http://primaryschoolweb.co.uk' );
	socket.emit( 'connect', { msg : 'connected' } );
	socket.on( 'id', function ( data ) {
	    ko.applyBindings( new ViewModel( data.id ) );
	});	

})();