

var 	config 		= require('../config/config'),
	Token 		= require('../models/token'),
	User 		= require('../models/user'),
	Moment 		= require('moment');


/*
|--------------------------------------------------------------------------
| Forgotten Password Controller
|--------------------------------------------------------------------------
*/

exports.getIndex = function(req, res){
	res.render('forgotten/index', { error : req.flash('error') });
}


exports.postIndex = function(req, res) {
	if (req.body.email.length < 0) {
		req.flash('error', 'Please enter a valid email!')
		return res.redirect('/forgotten');
	}

	User.findOne({ email : req.body.email }).exec(function(err, user){

		if ( err || user == null ) {
			req.flash('error', 'Err... seems like this email doesnt have an account here.');
			return res.redirect('/forgotten');
		}

		Token.create({ 
			type : 'forgot',
			user : user._id, 
		}, function(err, token) {
			if (err) {
				req.flash('error', 'something went wrong. Please try again');
				return res.redirect('/forgotten')
			}
			res.render('forgotten/sent');
		});

	});
}


/*
|--------------------------------------------------------------------------
| Password Reset page
|--------------------------------------------------------------------------
*/

exports.getReset = function(req, res) {
	Token.findById(req.params.token).populate('user').exec(function(err, token) {

		if (err || token == null) return res.render('forgotten/error');

		if (Moment(token.created_at).add('m', 30).isAfter(Moment())) {

			User.findById(token.user.id, function(err, user) {
				res.render('forgotten/reset', { user : user, token : token, error : req.flash('error') });
			});

		} else { 
			res.render('forgotten/error');
		}

	});
}



/*
|--------------------------------------------------------------------------
| Update Password
|--------------------------------------------------------------------------
*/

exports.postReset = function(req, res) {
	Token.findById(req.params.token).populate('user').exec(function(err, token) {

		if (err || token == null) return res.render('forgotten/error');

		if ( req.body.password.length <= 0 ) {
			req.flash('error', 'You must enter a password')
			return res.redirect('/forgotten/reset/' + token.id);
		}

		if ( req.body.password !== req.body.compare ) {
			req.flash('error', 'Passwords Dont match!')
			return res.redirect('/forgotten/reset/' + token.id);
		}

		token.user.password = req.body.password;

		token.user.save(function(err, user) {

			if (err) { 
				req.flash('error', 'Something went wrong. Please try again.');
				return res.redirect('/forgotten/reset/' + req.params.token);
			}
			token.remove();
			res.redirect('/login');

		});

	});
}