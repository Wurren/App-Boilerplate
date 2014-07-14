

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

               if (err) { return done(err); }

               if (!user) {
                    return done(null, false, { message: 'Incorrect email.' });
               }

               // user.comparePassword(password, function(err, isMatch) {
               //   if (err) throw err;
               //   return (isMatch) ? done(null, user) : done(null, false, { message: 'Incorrect password.' });
               // });

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