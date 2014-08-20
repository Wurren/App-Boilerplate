
var  FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function(passport, User, config) {

     /*
     |--------------------------------------------------------------------------
     | Facebook
     |--------------------------------------------------------------------------
     */

     passport.use(new FacebookStrategy({
          clientID:      config.clientID,
          clientSecret:  config.clientSecret,
          callbackURL:   config.callbackURL
          }, 
          function(accessToken, refreshToken, profile, done) {
               User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if(user) return done(null, user);

                    var user = new User({
                    	facebook {
	                         id:      profile.id,
	                         token:    accessToken,
	                         refreshToken:   refreshToken
                    	}
                    }).save(function(err, user) {
                         if(err) { throw err; }
                         done(null, user);
                    });

               });
          }
     ));


}