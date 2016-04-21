Node Quick Dev Boilerplate 
============
A node.js-based dev server and starter boilerplate for fast development of client projects. Compiles from less and jade and generally makes a neat little www/ folder I can pass on to clients.

###Requirements###
Grunt, jade, and less (for the compile script)

    npm install -g grunt-cli less jade

###Installation###

1. Clone the repo

		git clone https://github.com/cody1213/static-dev-boilerplate.git

2. Rename the folder

		mv static-dev-boilerplate project-name/

3. Navigate to the www directory

		cd project-name/

4. Install node packages and bower components

		npm install

5. Start the web server

    npm start

6. Visit [http://localhost:4000](http://localhost:4000) in your browser

And that's it.  If you make any changes to any file that isn't .jade, .less, or in the www folder, you'll need to restart the app.