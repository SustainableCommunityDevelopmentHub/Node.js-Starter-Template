Node.js-Boilerplate
===================

A simple but effective Node.js Boilerplate using ExpressJS, MongoDB, SocketIO, jQuery, Bootstrap and AngularJS. 

Below is a quick walkthrough in how to set up quickly and get moving with the above. To show its use we'll make a basic chat application as it's a nice way of showing how to use the components and leaves a framework that is easily edited to perform all the typical functionality you need for a website.


I'm assuming you have a server with Node installed and can connect to it via the command line. First thing i'd recommend doing is to get up to date with the latest stable version of Node. This is really easy - make sure you're in your root directory and type the following into the command line:

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

Now the first thing to put into your new folder is a 'package.json' file to specify your project details. Open up your text editor, create a new json file (js will do if you're using Dreamweaver) and copy and paste the following JSON object in. Replace the name, version etc with whatever you wish. The scripts.start value is what you'll type into the command line to start your application. I'm going to call my Node script 'script.js' but you can call it whatever you want. Check the version numbers of our dependencies at https://npmjs.org/ (the x means npm will attempt to use the latest version) and update accordingly. You can add dependencies if required.

`````json
{
    "name": "boilerplate",
    "version": "0.0.1",
    "private": true,
    "scripts": {
        "start": "node script.js"
    },
    "dependencies": {
		"express": "3.4.0.x",
		"socket.io": "0.9.16.x",
		"mongodb": "1.3.19.x",
		"mongojs": "0.9.4.x"
    },
    "engine": "node 0.10.18"
}
`````

This is quite a small package.json file. For a complete guide to creating a package file take a look here http://package.json.nodejitsu.com/ what we have here is short but it will work. Feel free to add to it if you want. Now we've specified the modules we'll be using, installing them is a breeze. Save the file (with a .json extension) and upload it to your directory. Make sure you're in your new directory and on the command line type:

`````
sudo npm install
`````

which installs all the modules / dependencies into a node_modules folder, within your directory. Now the fun begins. Let's create our Node script which will handle all our server side stuff. Create a new JavaScript file and save it as whatever you specified it as in your package.json file.   
