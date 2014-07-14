
var User 	= require('../models/user'),
	_ 		= require('lodash');

/*
|--------------------------------------------------------------------------
| Signup Controller
|--------------------------------------------------------------------------
*/

exports.getIndex = function(req, res){
	res.render('signup', { errors : req.flash('errors') });
}

exports.postIndex = function(req, res){

	var user = new User({
		email:    req.body.email,
		password: req.body.password,
	}).save(function(err, user) {

		if(err) {
			var errors = [];
			_.each(err.errors, function(val, key) {
				errors.push(val);
			});
			req.flash('errors', errors)
			return res.redirect('/signup');
		} else {
			res.redirect('/login');
		}

	});

};