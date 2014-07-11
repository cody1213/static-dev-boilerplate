Node PHP Development Environment 
============
A node.js-based dev server and starter boilerplate for client projects that will eventually be on Apache/Nginx. Serves up simple PHP files (instructions and explanation below), compiles less and jade, and generally makes a neat little www/ folder I can pass on to clients.

###Requirements###
You might also want to install the following globally:

1. Bower (for installing web packages)

    npm install -g bower

2. Grunt, jade, and less (for the compile script)

    npm install -g grunt-cli less jade

3. I use autoenv and nvm to manage the version of Node in use for different projects. More info at:

    https://github.com/creationix/nvm
    https://github.com/kennethreitz/autoenv

4. For PHP, you'll need PHP installed locally.  Make sure you can run php scripts with just 

    php-cgi /path/to/script.php

It works by just running the script from the command line and getting the stdout.  It also supports GET variables and, with a bit of a hack, POST variables.  Since passing POST variables through the command line is a bear, It basically passes a GET variable with all the POST values and inserts a line at the top of the PHP script:

    <?php $_POST = $_GET['_POST']; ?>   

By default, only scripts in the www/php/ folder with a .php extension will be treated as PHP scripts. That can be modified in the routes.js file.  This obviously isn't meant for complex, PHP-based applications but it works fine for early development.


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
You can just replace the contents of the www folder if you just want static files but there's a basic app structure inside you can use.  To use it, follow these steps:

5. Navigate to the www directory

		cd www/

6. Modify the bower.json file and add any JavaScript libraries you intend to use.  The .bowerrc file defines the location the libraries will be installed. Change that if you don't want them in assets/js/libs.  Then run:

		bower install

###Start dev server###

7. Change any settings in app.js you care to change.  Big ones are the port -- I use port 4000 by default here -- and the grunt stuff -- if you don't use jade or less, comment out the grunt code.  You can also edit the Gruntfile.js file to your liking.


8. Run the app.js file with Node

		node app.js


9. Visit [http://localhost:4000](http://localhost:4000) in your browser

And that's it.  If you make any changes to any file that isn't .jade, .less, or in the www folder, you'll need to restart the app.