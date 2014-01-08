Development Boilerplate
============
A node.js-based dev server and starter boilerplate for client projects that will eventually be on Apache. Allows for simple API routes to emulate a server-side API and serves up the www folder as static files. I made this to start development locally without the need for XAMPP or a dev server.

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
You can replace the contents of the www folder but there's a basic app structure inside you can use.  To use it, follow these steps: 

5. Navigate to the www directory
		
		cd www/

6. Modify the bower.json file and add any JavaScript libraries you intend to use.  The .bowerrc file defines the location the libraries will be installed. Change that if you don't want them in assets/js/libs.  Then run:

		bower install	

###Start dev server### 
7. You can just run app.js file with Node (or use the server script in the bin folder)

    node app.js

  or
    
    sh bin/server.sh

8. Visit localhost:3000 in your browser

And that's it.  Put static files in the www folder and make any API placeholders in the routes.js file.


