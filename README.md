Node.js-Basic-Boilerplate
===================

A simple but effective Node.js Boilerplate using ExpressJS, MongoDB, MongoJS & SocketIO. 

Below is a quick walkthrough in how to get set up quickly and moving with the above. It's meant strictly for beginners to Node so any non-novices please stop reading... now! Express is used as the server side framework giving us easy ways to provide typical server functionality. Socket.IO allows us to use WebSockets as our data transfer method which gives us real-time capabilities and a nice substitute for AJAX. MongoDB will be our data store and MongoJS our simplified API making interacting with MongoDB from script easy. To show these modules in action i've made a basic chat application as it's a nice way of showing how the components can be used together and leaves a basic framework that is easily edited to perform all the typical functionality of a website.


I'm assuming you have a server with Node installed and can connect to it via a command line interface. First thing i'd recommend doing is to get up to date with the latest stable version of Node. This is really easy - make sure you're in your root directory and type the following into the command line:

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
    "author": "Mike Chadwick <mike@digitalandwise.com>",
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

This will install all the modules / dependencies into a node_modules folder, within your directory. Now the fun begins. First we'll need to create a Node script file to handle all the server side behaviour. Create a new JavaScript file and save it as whatever you specified in your package.json file. As we're using Express as the framework for our application the first thing to do is initialise a new Express app. Type the following into your script (comments are optional):

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

Ok so now what I like to do is create a 'public' folder within my working directory for all my static files (HTML, CSS, JS, images etc.). Create one and then create an index.html file and pop it in there (stick a h1 tag in there or something so you can tell if your server's working when we boot it up). Now we need to tell the server which port to listen for connections on (I'm using 1337) and point our app to the directory holding all our static files. Add the following lines to your script:

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

Replace 'script.js' with whatever you've named your Node script. Open up your browser and go to your server's URL (if you're running it locally it'll be localhost) and specify the port after it with a colon e.g. localhost:1337. Your index.html file should now be served to the browser. The reason we typed 'node-dev' and not just 'node' on the command line is that the '-dev' bit allows us to make changes to our script file, upload them and have the server automatically restart, saving us from manually having to do it.

OK time to incorporate Socket.IO. Socket.IO is a great way to provide WebSocket functionality quickly and easily into your website, bringing with it all the benefits that WebSockets have over standard HTTP connections. We'll use WebSockets as a replacement for AJAX so we can send data to and from the server to users without the need for a page refresh. Go back to your script file and add the following to your list of variables:

`````javascript
	io = require( 'socket.io' ).listen( server );	//	listen for socket events
`````

This statement imports the Socket.IO module and tells it to listen for socket events via our server. Make sure you keep adjusting the commas after each variable declaration. 
