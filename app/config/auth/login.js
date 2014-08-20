

var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, User) {

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

passport.use(new LocalStrategy({
          usernameField: "email",
          passwordField: "password"
     },
     function(email, password, done) {
          
          User.findOne({ email: email }, function(err, user) {

               if (err) return done(err); 

               if (!user) return done(null, false, { message: 'Incorrect email.' });

               if (!user.authenticate(password)) {
                    return done(null, false, {
                         message: 'Invalid password'
                    });
               }

               return done(null, user);

          });
          
     }
));

}