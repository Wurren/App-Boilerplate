var 	config 		= require('../config/config'),
	mongoose 		= require('mongoose'),
	Schema 		= mongoose.Schema,
	swig 		= require('swig'),
	sendgrid 		= require('sendgrid')(config.sendgrid.username, config.sendgrid.password);

/*
|--------------------------------------------------------------------------
| token Model
|--------------------------------------------------------------------------
*/

var tokenSchema = new Schema({
	type: 		{ type: String },
	user: 		{ type: Schema.Types.ObjectId, ref: 'User' },
	restaurant: 	{ type: Schema.Types.ObjectId, ref: 'Restaurant' },
	created_at: 	{ type: Date, default: Date.now },
	updated_at: 	{ type: Date, default: Date.now }
});

tokenSchema.pre('save', function(next){
	this.updated_at = new Date;
	if ( !this.created_at ) this.created_at = new Date;
	next();
});


/*
|--------------------------------------------------------------------------
| Email the Token After Save
|--------------------------------------------------------------------------
*/

tokenSchema.post('save', function(token) {

	token.populate('user', function(err, token) {

		var 	htmlview = '/app/views/emails/forgotten.html',
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

	});

});


/*
|--------------------------------------------------------------------------
| Export that motha'
|--------------------------------------------------------------------------
*/

module.exports = mongoose.model('Token', tokenSchema);