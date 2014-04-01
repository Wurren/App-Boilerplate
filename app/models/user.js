var 	mongoose 	= require('mongoose'),
	Schema 	= mongoose.Schema,
	bcrypt 	= require('bcrypt'),
	SALT  	= 10;

/*
|--------------------------------------------------------------------------
| User Model
|--------------------------------------------------------------------------
*/

var userSchema = new Schema({
	firstName: 	{ type: String },
	lastName: 	{ type: String },
	email: 		{ type: String },
	password: 	{ type: String },
	token: 		{ type: String },
	secret: 		{ type: String },
	created_at: 	{ type: Date, default: Date.now },
	updated_at: 	{ type: Date, default: Date.now }
});

userSchema.pre('save', function(next){
	this.updated_at = new Date;
	if ( !this.created_at ) this.created_at = new Date;
	next();
});



/*
|--------------------------------------------------------------------------
| Pre-save Password Salting & Compare Method
|--------------------------------------------------------------------------
*/

userSchema.pre('save', function(next) {
	var user = this;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});

});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
	if (err) return cb(err);
		cb(null, isMatch);
	});
};


/*
|--------------------------------------------------------------------------
| Validate Email Address
|--------------------------------------------------------------------------
*/

userSchema.path('email').validate(function (value, respond) {                                                                                          
    this.model('User').findOne({ email: value }, function (err, user) {                                                                                                
        (user) ? respond(false) : respond(true);                                                                                                                        
    });                                                                                                                                                  
}, 'This Email Address is already in use');



/*
|--------------------------------------------------------------------------
| Export that motha'
|--------------------------------------------------------------------------
*/

module.exports = mongoose.model('User', userSchema);

