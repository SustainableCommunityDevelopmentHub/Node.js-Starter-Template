Node.js-Boilerplate
===================

A simple but effective Node.js Boilerplate using ExpressJS, MongoDB, SocketIO, jQuery, Bootstrap and AngularJS. This is a walkthrough in how to set it up quickly and get moving with the above. To show its use I'm going to set it up as a chat application - it may have been done before many times but it's a nice way of showing how to use the components and leaves a framework that is easily edited to perform all the typical functionality you need for a website.


First I'm going to assume you have a server with Node installed and can connect to it via the command line. If not visit http://nodejs.org/, setup couldn't be easier. First thing i'd recommend doing is to get up to date with the latest stable version of Node. This is really easy - make sure you're in your root directory and type the following into the command line:

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

Now the first thing to do is create a package.json file to specify your project details. Open up your text editor and create a new js file and copy and paste the following JSON object in. Replace the name, version etc with whatever you wish but leave the dependencies the same:

`````json
{
    "name": "boilerplate",
    "version": "0.0.1",
    "private": true,
    "scripts": {
        "start": "node script.js"
    },
    "dependencies": {
        "express": "*",
        "socket.io": "*",
		    "mongodb": "*",
        "mongojs": "*"
    }
}
`````

Now we've identified the modules we'll be using installing them is a breeze. Save the file with a .json extension and upload it to your directory. Make sure you're in your new directory on the command line and type:

`````
sudo npm install
`````

to install all the modules into a node_modules folder within your directory. 
