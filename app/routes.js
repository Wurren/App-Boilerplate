
var passport  	= require('passport'),
	Home 		= require('./controllers/home'),
	Admin 		= require('./controllers/admin'),
	Forgotten 	= require('./controllers/forgotten'),
	Signup 		= require('./controllers/signup');

module.exports = function(app) {

	/*
	|--------------------------------------------------------------------------
	| Auth Middleware & Protected Areas
	|--------------------------------------------------------------------------
	*/

	var Authed = function(req, res, next) {
		if (req.isAuthenticated()) { return next(); }
		res.redirect('/');
	}

	app.all('/admin*', Authed);

	app.use(function(req, res, next){
		res.locals.admin = req.user;
		next();
	});


	/*
	|--------------------------------------------------------------------------
	| Routes
	|--------------------------------------------------------------------------
	*/

	app.get('/', Home.getIndex);

	app.get('/admin', Admin.getIndex);

	app.get('/forgotten', Forgotten.getIndex);
	app.post('/forgotten', Forgotten.postIndex);
	app.get('/forgotten/reset/:token', Forgotten.getReset);
	app.post('/forgotten/reset/:token', Forgotten.postReset);

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});





	/*
	|--------------------------------------------------------------------------
	| Twitter
	|--------------------------------------------------------------------------
	*/

	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback', passport.authenticate('twitter', { 
		successRedirect: '/admin',
		failureRedirect: '/failure' 
	}));

	/*
	|--------------------------------------------------------------------------
	| Facebook
	|--------------------------------------------------------------------------
	*/

	app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['read_stream', 'publish_actions'] }));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', { 
		successRedirect: '/admin',
		failureRedirect: '/failure' 
	}));

	/*
	|--------------------------------------------------------------------------
	| Local
	|--------------------------------------------------------------------------
	*/

	app.get('/login', function(req, res) {
		res.render('login', { error : req.flash('error') });
	});

	app.post('/login', passport.authenticate('local', { 
		successRedirect: '/admin',
		failureRedirect: '/login',
		failureFlash: true
	}));


	/*
	|--------------------------------------------------------------------------
	| Signup
	|--------------------------------------------------------------------------
	*/

	app.get('/signup', Signup.getIndex);
	app.post('/signup', Signup.postIndex);


	/*
	|--------------------------------------------------------------------------
	| Auth Failure
	|--------------------------------------------------------------------------
	*/
	app.get('/failure', function(req, res) {
		res.send(500);
	});

}