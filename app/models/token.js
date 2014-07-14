
var	mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema,
	Email 		= require('../services/email');

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
		Email.forgotten(token);
	});
});


/*
|--------------------------------------------------------------------------
| Export that motha'
|--------------------------------------------------------------------------
*/

module.exports = mongoose.model('Token', tokenSchema);