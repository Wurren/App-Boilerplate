
var  TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function(passport, User, config) {

     /*
     |--------------------------------------------------------------------------
     | Twitter
     |--------------------------------------------------------------------------
     */

     passport.use(new TwitterStrategy({
               consumerKey:        config.consumerKey,
               consumerSecret:     config.consumerSecret,
               callbackURL:        config.callbackURL
          },
          function(token, tokenSecret, profile, done) {

               User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                    if(user) return done(null, user);

                    var user = new User({
                         twitter : {
	               		id: profile.id,
	               		token: token,
	               		tokenSecret: tokenSecret
               		}	
                    }).save(function(err, user) {
                         if(err) { throw err; }
                         done(null, user);
                    });

               });

          }
     ));

}