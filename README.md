### Development Boilerplate
This application includes an express app that can be used as a starting point to build many common types of web applications. 

## The folders are:

- bin/ - a place for scripts. The `www` file starts the web server and app.js.
- data/ - the place to put controller functions that fetch data from your models for either your UI routes or your API. 
- routes/ - contains all of your routes
- src/ - contains your Pug views, SCSS, and ES6 javascript, which is compiled to a dist/ folder 
- dist/ - contains files compiled from`src/` in HTML, CSS, and browser-compatible Javascript. Contains an `assets/` folder for images, videos, files, etc.  
- test/ - contains mocha unit test scripts

If your views will not be pre-compiled for distribution, you can delete the code that compiles the HTML and just use src/pug as your views/ folder.

## Other files: 

- app.js - contains the main application code
- gulp-tasks.js - contains all the automated compilation code
- server.sh - uses supervisor to run the application so it restarts when changes are made to files not in dist

How to Run

- install: `npm install`
- start: `npm start`
- test: `npm test`