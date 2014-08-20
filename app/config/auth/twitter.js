
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

               User.findOne({ uid: profile.id }, function(err, user) {
               	
                    if(user) return done(null, user);

                    var user = new User({
                         uid:      profile.id,
                         token:    token,
                         secret:   tokenSecret
                    }).save(function(err, user) {
                         if(err) { throw err; }
                         done(null, user);
                    });

               });

          }
     ));

}