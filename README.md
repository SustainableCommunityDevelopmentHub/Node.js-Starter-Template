Node.js-Boilerplate
===================

A simple but effective Node.js Boilerplate using ExpressJS, MongoDB, MongoJS & SocketIO. 

Below is a quick walkthrough in how to get set up quickly and moving with the above. It's meant strictly for beginners to Node so any non-novices please stop reading... now! To show its use i've made a basic chat application as it's a nice way of showing how the components can be used (WebSockets etc.) and leaves a basic framework that is easily edited to perform all the typical functionality needed by a website.


I'm assuming you have a server with Node installed and can connect to it via the command line using Putty or something similar. First thing i'd recommend doing is to get up to date with the latest stable version of Node. This is really easy - make sure you're in your root directory and type the following into the command line:

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

Ok so now what I like to do is create a public folder within my working directory for all my static files (HTML, CSS, JS, images etc.). Create one and then create an index.html file and pop it in there (stick a h1 tag in there or something so you can tell if your server's working when we boot it up). Now we need to tell the server which port to listen for connections on (I'm using 1337) and point our app the directory holding all our static files. Add the following lines to your script:

`````javascript
//	listen for connections on port 1337
server.listen( 1337 );

//	specify static file directory to serve to users
//	e.g. html, css, js, images etc	
app.use( express.static( __dirname + '/public' ) );	

`````


