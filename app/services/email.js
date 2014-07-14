var config 		= require('../config/config'),
	swig 		= require('swig'),
	sendgrid 	= require('sendgrid')(config.sendgrid.username, config.sendgrid.password);


/*
|--------------------------------------------------------------------------
| Emails Services
|--------------------------------------------------------------------------
*/

exports.forgotten = function(token) {

	var htmlview = '/app/views/emails/forgotten.html',
		html = swig.renderFile(process.cwd() + htmlview, { site_url : config.site_url, token : token }),
		options = {
			to : token.user.email,
			from : config.forgotten.fromEmail,
			subject : config.forgotten.subject,
			html : html    
		};

	sendgrid.send(options, function(err, json) {
		if (err) { return console.error(err); }
	});

}