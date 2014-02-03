Development Boilerplate
============
A node.js-based dev server and starter boilerplate for client projects that will eventually be on Apache. Allows for simple API routes to emulate a server-side API and serves up the www folder as static files. I made this to start development locally without the need for XAMPP or a dev server.

###Requirements###
The only definite requirement is Node.js.  You might also want to install the following globally:

1. Bower (for installing web packages)

    npm install -g bower
    
2. Grunt, jade, and less (for the compile script)

    npm install -g grunt-cli less jade
    

###Installation###

1. Clone the repo
	
		git clone https://github.com/cody1213/static-dev-boilerplate.git
		
2. Rename the folder
		
		mv static-dev-boilerplate project-name/

3. Navigate to the www directory
		
		cd project-name/

4. Install node packages

		npm install


###Optional###
You can just replace the contents of the www folder but there's a basic app structure inside you can use.  To use it, follow these steps: 

5. Navigate to the www directory
		
		cd www/

6. Modify the bower.json file and add any JavaScript libraries you intend to use.  The .bowerrc file defines the location the libraries will be installed. Change that if you don't want them in assets/js/libs.  Then run:

		bower install	

###Start dev server###

7. Change any settings in app.js you care to change.  Big ones are the port -- I use port 4000 by default here -- and the grunt stuff -- if you don't use jade or less, comment out the grunt code.  You can also edit the Gruntfile.js file to your liking.


8. Run the app.js file with Node

		node app.js


9. Visit [http://localhost:4000](http://localhost:4000) in your browser

And that's it.  Put static files in the www folder and add any API placeholders in the routes.js file.