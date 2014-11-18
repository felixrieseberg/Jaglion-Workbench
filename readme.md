# Jaglion Workbench
This repo contains the 'work in progress' web client for the Jaglion Workbench. It'll do awesome things, but sadly not just yet.

![Jaglion Standalone OS X](https://raw.githubusercontent.com/felixrieseberg/Jaglion-Workbench/master/docs/screen1.png)

## Development Documentation
The workbench consists of two major parts: An ember web client application (in `core/client`) and a node server ready for standalone packaging using node-webkit (in `core/server`). The chain of commands to get up and running are:

- `npm install` Installs all required packages for assisted development in ./node_modules
- `bower install` Installs all required bower dependencies into `./core/client/bower_dependencies`
- `grunt build` Compiles, packages and copies the client into `core/server/clientdist`, from where the server will serve the production-ready version of the Ember client.
- `cd ./core/server/ && npm install` Install all required packages for the node server component in ./core/server/node_modules
- `node app.js` Starts the Node server, available at 0.0.0.0/localhost:3000 (please note that this command must be run from `./core/server)

### Running The Whole Package
The workbench consits of two pieces - the API server and the Ember app. Both are technically their own projects and come with their own grunt buildchain, node modules and other pieces of baggage. Running 'the whole package' requires building of the Ember app and running the API node server. To simplify development, the root grunt is able to build the Ember app, start the API server and automatically rebuild/reload should any of the source files change.

**Please note that this command will not result in any output from the Ember watch task or the node server. Run the whole package with :** `./grunt liveapi`

### Working on the Ember App
Many parts of the Ember app development workflow are automated using Grunt and the scaffolding takes care of all required optimizations. To make changes to the Ember app, make your changes in `./core/client`. Running `grunt serve` will start a server at 0.0.0.0/localhost:3000 that automatically rebuilds, recompiles and reloads an open page upon changes.

#### Architecture
At this point, the Ember app follows ember-cli conventions for a typical MVC app. Controllers are in `scripts/controllers`, models in `scripts/models`, routes in `scripts/routes`, views in `scripts/views`. Guidelines and recommendations outlined in the [official Ember guides](http://emberjs.com/guides/) are applicable without exception.

As far as design is concerned, the whole app uses Bootstrap 3 (with a 12-cell based grid) as well as Flat-UI.

### Working on the Node Server
The server is comparably lightweight and does only two things: It serves the minified and optimized version of the Ember app as static files and serves a JSON-based API. In `./core/server/bin` you'll find a number of bash scripts that correlate with specific Jaglion tasks. It's the Node server's job to change those scripts according to the configuration made in the Ember client and finally execute them, delivering the script output back to the Ember app. All user interaction should happen in the Ember app, the server is simply the more powerful companion in the background, able to make use of Node modules and access to the filesystem and OS.

#### Architecture
- `app.js`: Starts an Express server, which serves the Ember app at `./core/server/clientdist` as static files, while all HTTP calls to `/api` are handed of to the API middleware in `./core/server/api`.
- `api/index.js`: Sets up routing for all HTTP calls to `/api`, responding to the requests using modules defined in the same folder. Please note that we're using ember-data`s semi-automatic RestAdapter, which assumes conventional API urls (see table below).
- `api/scriptRunner.js`: Module for script execution. The main function `run('./myscript.sh')` allows the execution of a given script. Returns a Bluebird Promise, fullfilled with the stdout, rejected with stderr of the called script.

##### Expected URI convention for the API
| Ember.Store Action | HTTP Request | URL Called    |
|--------------------|--------------|---------------|
| Find               | GET          | api/model/123 |
| Find All           | GET          | api/model     |
| Update             | PUT          | api/model/123 |
| Create             | POST         | api/model     |
| Delete             | DELETE       | api/model/123 |
