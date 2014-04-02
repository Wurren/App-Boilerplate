Express Boilerplate
===================

Personal boilerplate for Apps/API's/Prototypes/Dossing and such

## Install & Run

```
npm install
```

The App can be run with 

```
node app.js
``` 

or with nodemon 

```
nodemon app.js
```

Theres a nodemon config file included to ignore changes in the public and views folder.



## Whats in the box?

This is built with: 

- [Express](http://expressjs.com/)
- [Mongoose](http://mongoosejs.com/)
- [Passport](http://passportjs.org/)
- [Swig Template Engine](paularmstrong.github.io/swig/)
- [Gulp](http://gulpjs.com/)
- [LESS](http://lesscss.org/)
- [Preboot](http://getpreboot.com/)





## Built-in RESTful Routing

This boilerplate supports resftul routing out of the box.

In the `app.js` file on line 67-90 (shown below) theres a function which loops through files in the controller directory and sets up the routes. Only the methods included in your controller files will be mapped to a route. All others will be ignored.

Routes created are based off the file name. For instance `users.js` route is `/users`. 

All routes are root level, but this can be changed by editing the last line `app.use('/'...` to something else like `app.use('/admin'...` etc.




```
var mappings = [
     { method: "index",       verb: "get",    route: "/"         },
     { method: "new",         verb: "get",    route: "/new"      },
     { method: "create",      verb: "post",   route: "/"         },
     { method: "show",        verb: "get",    route: "/:id"      },
     { method: "edit",        verb: "get",    route: "/:id/edit" },    
     { method: "update",      verb: "put",    route: "/:id"      },
     { method: "destroy",     verb: "delete", route: "/:id"      }
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


## Auth

Comes with built in Local, Facebook and Twitter logins powered by Passport.

Select which you want to use from both environment config files under the `authMethod` array

If your using facebook or twitter you NEED to add the consumer/secret keys or the app wont run.



## Database

This boilerplate uses MongoDB with the Mongoose ORM. 

Specify you're mongo database URL in the environment config settings. 



## Whos this for?

This is really just a boilerplate I use in work or when I want to test/prototype something. Although if it helps someone else with a basis for MVC in express thats cool, hence the documentation.

Explore the source code for more info. Most of the magic happens in `app.js`


## Todo
 
- Better Controller Pattern
- Handle Singleton REST routes
- Better defaults for Mongo & Auth


