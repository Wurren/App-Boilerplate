
/*
|--------------------------------------------------------------------------
| Dependencies
|--------------------------------------------------------------------------
*/

var 	express 		= require('express'),
	app 			= express(),
	fs 			= require('fs'),
	_ 			= require('lodash'),
	mongoose 		= require('mongoose'),
	passport 		= require('passport'),
	swig 		= require('swig');


/*
|--------------------------------------------------------------------------
| Environment Config
|--------------------------------------------------------------------------
*/

var env = process.env.NODE_ENV || 'development';

if ( env ==='development' ) {
	var config = require('./app/config/development.js');
} else {
	var config = require('./app/config/production.js');
}


/*
|--------------------------------------------------------------------------
| Swig Configure
|--------------------------------------------------------------------------
*/

app.set('views', __dirname + '/app/views');
app.set('view engine', 'html');
app.set('view cache', false);
app.engine('html', swig.renderFile);

swig.setDefaults({ cache: config.cacheTemplates });


/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/

app.use(express.static(__dirname + '/app/public'));
app.use(express.static(__dirname + '/bower_components'));
app.use(require('body-parser')());
app.use(require('method-override')());
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: config.sessionKey }));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('connect-flash')());
app.use(require('express-promise')());




/*
|--------------------------------------------------------------------------
| Bootstrap Controller Resources
|--------------------------------------------------------------------------
*/

var mappings = [
	{ method: "index", 		verb: "get", 	route: "/" },
	{ method: "new", 		verb: "get",	route: "/new" },
	{ method: "create", 	verb: "post", 	route: "/" },
	{ method: "show", 		verb: "get", 	route: "/:id" },
	{ method: "edit", 		verb: "get", 	route: "/:id/edit" },	
	{ method: "update", 	verb: "put", 	route: "/:id" },
	{ method: "destroy",	verb: "delete", route: "/:id"}
];


_.each(fs.readdirSync('./app/controllers/'), function(file, index) {
	var router 		= express.Router(),
	    controller 	= require('./app/controllers/' + file);
	_.each(mappings, function(mapping, index) {
		if ( typeof controller[mapping.method] == 'function' ) router[mapping.verb](mapping.route, controller[mapping.method]);
	});
	app.use('/' + file.slice(0, -3), router);
});


/*
|--------------------------------------------------------------------------
| Bootstrap Single Routes
|--------------------------------------------------------------------------
*/

var routes = [
	'index',
	'auth'
];

_.each(routes, function(file, index) {
	require('./app/routes/' + file)(app);
});



/*
|--------------------------------------------------------------------------
| Init Auth
|--------------------------------------------------------------------------
*/

var User 	= require('./app/models/user');

_.each(config.authMethods, function(file, index) {
	require('./app/config/auth/' + file)(passport, User, config);
});

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	User.findOne({ _id: id }).populate('restaurant').exec(function (err, user) {
		if(!err) done(null, user);
		else done(err, null)  
	});
});


/*
|--------------------------------------------------------------------------
| Get DB
|--------------------------------------------------------------------------
*/

mongoose.connect(config.database);


/*
|--------------------------------------------------------------------------
| Listen to that server purr...
|--------------------------------------------------------------------------
*/

app.listen(3000);

