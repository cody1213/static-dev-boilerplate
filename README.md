# Development Boilerplate
This application includes the basics of an Express app that can be used as a starting point to build many common types of web applications, whether it's a site, an API, or a progressive web app. It also creates a dist/ folder with compiled front-end code ready for distribution either as a static web app or to be turned into a progressive web app (using Electron or some other purpose). 

### Key Folders:

- `bin/` - a place for scripts. The `www` file starts the web server and app.js.
- `data/` - the place to put controller functions that fetch data from your models for either your UI routes or your API. 
- `routes/` - contains all of your routes
- `src/` - contains your Pug views, SCSS, and ES6 javascript, which is compiled to a dist/ folder 
- `dist/` - contains files compiled from`src/` in HTML, CSS, and browser-compatible Javascript. Contains an `assets/` folder for images, videos, files, etc.  
- `test/` - contains mocha unit test scripts

If your views will not be pre-compiled for distribution, you can delete the code that compiles the HTML and just use `src/pug` as your `views/` folder.

## How to Run

- install: `npm install`
- start: `npm start`
- test: `npm test`

### Key files: 

- `app.js` - contains the main application code
- `gulpfile.js` - contains all the automated compilation code
- `server.sh` - uses node supervisor to run the application so it restarts when changes are made to files not in `dist/`
