Express Boilerplate
===================

Personal boilerplate for Apps/API's/Prototypes/Dossing and such

## Install

```
npm install
```

## Whats in the box?

This is built with Express (duh), Mongoose, Passport and and the Swig Template engine. It also features Gulp for easy JS/LESS compiling.

## Built in REST

In the `app.js` file you'll see a snippet for loading RESTful controllers. It looks like this :

```
var mappings = [
     { method: "index",       verb: "get",   route: "/" },
     { method: "new",         verb: "get",   route: "/new" },
     { method: "create",      verb: "post",  route: "/" },
     { method: "show",        verb: "get",   route: "/:id" },
     { method: "edit",        verb: "get",   route: "/:id/edit" },    
     { method: "update",      verb: "put",   route: "/:id" },
     { method: "destroy",     verb: "delete", route: "/:id"}
];


_.each(fs.readdirSync('./app/controllers/'), function(file, index) {
     var router          = express.Router(),
         controller      = require('./app/controllers/' + file);
     _.each(mappings, function(mapping, index) {
          if ( typeof controller[mapping.method] == 'function' ) router[mapping.verb](mapping.route, controller[mapping.method]);
     });
     app.use('/' + file.slice(0, -3), router);
});

```

Just save your controllers and name them after your route and you're good to go.

## Auth

Comes with built in Local, Facebook and Twitter logins powered by Passport;

Select which you want to use from the config file under the `authMethod` array

If your using facebook or twitter you NEED to add the consumer/secret keys or the app wont run

## Database

Just specify you're mongo database URL in the config settings. 

## Whos this for?

This is really just a boilerplate I use in work or when I want to test/prototype something. Although if it helps someone else with a basis for MVC in express thats cool, hence the documentation.


## todo
 
- better Controller Pattern
- Handle Singleton REST routes
- Better defaults for Mongo & Auth


