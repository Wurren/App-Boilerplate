
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
               User.findOne({ uid: profile.id }, function(err, user) {
                    if(user) {
                         done(null, user);
                    } else {
                         var user = new User({
                              uid:      profile.id,
                              token:    accessToken,
                              secret:   refreshToken
                         }).save(function(err, user) {
                              if(err) { throw err; }
                              console.log(err);
                              done(null, user);
                         });
                    }
               });
          }
     ));


}