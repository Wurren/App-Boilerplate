var 	passport = require('passport'),
	User = require('../models/user');

module.exports = function(app) {

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


	app.get('/signup', function(req, res){
		res.render('signup', { errors : req.flash('errors') });
	});

	app.post('/signup', function(req, res) {

		var user = new User({
			email: 	req.body.email,
			password: req.body.password,
		}).save(function(err, user) {
			if(err) {
				req.flash('errors', err)
				return res.redirect('/signup');
			} else {
				res.redirect('/login');
			}
		});

	});

}