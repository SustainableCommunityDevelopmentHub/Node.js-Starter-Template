Node.js-Basic-Boilerplate
===================

A simple but effective Node.js Boilerplate using ExpressJS, MongoDB, MongoJS & SocketIO.

<h3>Intro</h3>

The idea here is to get the above set up quickly and easily, to show how each component works and to leave an easily editable boilerplate of sorts that can be customised into most types of websites or web applications. I've written a walkthrough guide explaining the whole set up process to help people starting out. It's meant strictly for beginners to Node so, to any non-novices, you can stop reading now! 

<h3>Modules and Pre-requisites</h3>

Express is used as the server side framework giving us easy ways to provide typical server functionality. Socket.IO allows us to use WebSockets as our data transfer method which gives us real-time capabilities and a nice substitute for AJAX. MongoDB will be our data store and MongoJS our simplified API making interacting with MongoDB from script easy. To show these modules in action i've made a basic chat application as it's a nice way of showing how the components can be used together and leaves a basic framework that is easily edited to perform all the functionality needed by a typical website. I built this using a remote server, care of RackSpace, with Debian installed as the OS. I'm assuming you have something similar (with Node installed) and can connect to the server via a terminal / command line interface. 

<h3>Setup</h3>

First thing i'd recommend doing is to get up to date with the latest stable version of Node. This is really easy - make sure you're in your root directory and type the following into the command line:

`````
sudo npm cache clean -f
sudo npm install n –g
sudo n stable 
`````

Check your version of Node by typing

`````
node -v
`````

At time of writing the latest stable version was 0.10.18. Now create a new directory for the project. Choose a name and type:

`````
mkdir directoryname
cd directoryname
`````

The first thing to put into your new folder is a 'package.json' file to specify your project details. Open up your text editor, create a new json file (js will do if you're using Dreamweaver) and copy and paste the below JSON object in. Replace the name, version etc with whatever you wish. The 'start' value is what you'll type into the command line to start your application. I'm going to call my Node script 'script.js' but you can call it whatever you want. Check the version numbers of the dependencies at https://npmjs.org/ and update the JSON accordingly. You can add extra dependencies if you want.

`````json
{
    "name": "boilerplate",
    "version": "0.0.1",
    "private": true,
    "author": "Mike Chadwick",
    "description": "A Node.js boilerplate",
    "scripts": {
        "start": "node script.js"
    },
    "dependencies": {
		"express": "3.4.0",
		"socket.io": "0.9.16",
		"mongodb": "1.3.19",
		"mongojs": "0.9.4"
    },
    "engine": "node 0.10.18"
}
`````

For a complete guide to creating a package file take a look here http://package.json.nodejitsu.com/, the above is short but it will work fine. Feel free to add to it if you want. Now we've specified the modules we'll be using, installing them is a breeze. Save the file (with a .json extension) and upload it to your directory. Make sure you're in your new directory and on the command line type:

`````
sudo npm install
`````
<h3>The Server Script</h3>

This will install all the modules / dependencies listed in the package file into a node_modules folder, within your directory. Now the fun begins. First we'll need to create a Node script file to handle all the server side behaviour. Create a new JavaScript file and save it as whatever you specified in your package.json file. As we're using Express as the framework for our application the first thing to do is initialise a new Express app. Type the following into your script (comments are optional):

`````javascript
var express = require( 'express' ),	//	import express module
	app = express();	//	create new express application

`````

Now let's create a HTTP server using the Express 'app' object we've just created. Add it to the list of variables like so:

`````javascript
var express = require( 'express' ),	//	import express module
	app = express(),	//	create new express application
	server = require( 'http' ).createServer( app );	//	create the server to listen for connections
`````
<h3>The 'Public' Folder</h3>

Ok so now create a 'public' folder within your working directory for all your static files (HTML, CSS, JS, images etc.). You can call it whatever you want. Create the directory and then create an index.html file and pop it in there (stick a h1 tag in there or a page title or something so you can tell if your server's working when we boot it up). Eventually your app's directory structure will look something like this, depending on what you've put in there (add whatever you want within the public folder):

`````
├── app
│   ├── script.js
│   ├── package.json
│   ├── public
│       ├── css
│   	  ├── js
│   	  ├── img
│ 	  ├── index.html
│   	  └── chat.html
`````

Now we need to tell the server which port to listen for connections on (I'm using 1337) and point our app to the directory holding all our static files. Add the following lines to your script:

`````javascript
//	listen for connections on port 1337
server.listen( 1337 );

//	specify static file directory to serve to users
//	e.g. html, css, js, images etc	
app.use( express.static( __dirname + '/public' ) );	

`````

Now we can test the Node server is working. Save and upload your script to your project's root directory (not the 'public' directory - this is important). Go to the command line and type to boot the server:

`````
node-dev script.js
`````

Replace 'script.js' with whatever you've named your Node script. Open up your browser and go to the URL tied to your server, specifying the port after it with a colon e.g. www.mysite.com:1337. Your index.html file will now be served up to the browser. The reason we typed 'node-dev' and not just 'node' on the command line is that the '-dev' bit allows us to make changes to our script file, upload them and have the server automatically restart, saving us from manually having to do it.

<h3>Socket.IO</h3>

OK, time to incorporate Socket.IO. Socket.IO is a great way to provide WebSocket functionality quickly and easily into your website, bringing with it all the benefits that WebSockets have over standard HTTP connections. We'll use WebSockets as a replacement for AJAX so we can send data to and from the server to users without the need for a page refresh. Go back to your script file and add the following to your list of variables:

`````javascript
io = require( 'socket.io' ).listen( server );	//	listen for socket events
`````

This will import the Socket.IO module and tell it to listen for socket events via our server. For a full list of all events available through the Socket.IO object created ('io') have a look here: https://github.com/LearnBoost/socket.io/wiki/Exposed-events. The first event we'll use is the 'connection' event, which fires every time a new connection is made to the server from any web page in our application. From this event we can grab the socket details for every user who connects to our app.


When you broadcast a socket event from the server it will emit globally to all sockets connected to the app, unless you specify a specific socket id to send it to. Therefore we'll grab the socket id of each user and store it on the client and the server (in our database) to allow us to broadcast to specific users and identify who has disconnected when a user shuts the browser window down. Beneath the public folder declaration in your Node script add the following:

`````javascript
io.sockets.on( 'connection', function ( socket ) {
	// grab socket.id of newly connected user here
	// and do other stuff
});
`````

Now we just need to hook it up on the clent-side to establish the connection to the server. We aren't going to do that for the index page because we're just going to use that to allow users to login to our chat application. I'm only going to use the most basic of styling for this app, but I've link to Bootstrap 3 via a CDN so it's there for future use when you turn this 'boilerplate' into your own application / website. The CDN is here http://www.bootstrapcdn.com/?v=082013. 

<h3>Index (Login) Page</h3>

Below is the HTML for the index page. I've kept it nice and simple; we'll use local storage to store the username of the user and start using sockets on the next page we'll create - our chat application.

`````html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta content="width=device-width" name="viewport">
    <title>Chat Login</title>
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
<body>
	<div class="holder">
    	<h1>Welcome to Chat</h1>
        <h2>Login here</h2>
        <form role="form">
          <div class="form-group">
            <label for="name">Please enter your name</label>
            <input type="text" class="form-control" id="name" autofocus placeholder="Enter name">
          </div>
          <p class="help-block">Enter your name to login in to chat.</p>
          <button id="submit" type="submit" class="btn btn-default">Submit</button>
        </form>
    </div>
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script>

	$( '#submit' ).click( function (e) {
        e.preventDefault();
		if( $( '#name' ).val().length < 3 ) {
			$( '.help-block' ).text( 'Please enter a name with at least 3 characters.' );
		}
		else {
			localStorage.setItem( 'user', $( '#name' ).val() );
			window.location = 'chat.html';		
		}
    });

</script>
</body>
</html>
`````

There's a meta tag in the head to make it mobile friendly and a link to a CSS file with a bit of basic styling for the holder div. Bootstrap takes care of the rest. I'll show the CSS file later (it's tiny). Now we need to create a chat.html page to handle our chat app. Like everything else that's served to the user we'll need to put it in the public folder.

<h3>MongoDB / MongoJS</h3>

The idea behind the chat app is MongoDB will store the user's name and socket id which will be updated everytime a user connects or disconnects which allows us to display exactly who is online at any given time. We'll let people choose whether they want their message to transmit to all the users online or to send a 'private' message to a specific user. Let's begin by configuring MongoDB. On the command line simply type mongo to enter the Mongo shell. First off, here are a few useful Mongo commands. Use these to create your database and collection to store the users details. I've called my database 'chat' and my collection 'users' (you call them whatever you want): 

Show all databases (usually there is a local one created by default).

`````
show dbs
`````
Create a database:

`````
use mydatabasename
`````
Create a 'collection' (the Mongo equivalent of a table)

`````
db.createCollection("collection_name") 
`````
Show all collections in the database

`````
show collections
`````
Insert a record (Mongo equivalent of a row) into the collection

`````
db.collection_name.insert( { attr_name : value, attr2_name : value… etc. } ) 
`````
Remove a record from the collection

`````
db.collection_name.remove( { attr_name : value, attr2_name : value… etc. } )
`````

Now we have our database and collection let's hook it up to our server script. We'll use MongoJS which provides a nice, simple interface to let us easily interact with our database. In your Node script, add the following to the list of variables:

`````javascript
ObjectId = require( 'mongodb' ).ObjectID,	//	create ObjectId object to access the id within mongo collections
databaseUrl = "mongodb://localhost:27017/chat", //	specify database name here
collections = [ "users" ],	//	specify collections within database here
db = require( "mongojs" ).connect( databaseUrl, collections );	//	create database object
`````
