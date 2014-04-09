
module.exports = function(app) {


     /*
     |--------------------------------------------------------------------------
     | Auth Middleware & Protected Areas
     |--------------------------------------------------------------------------
     */

     var Authed = function(req, res, next) {
          if (req.isAuthenticated()) { return next(); }
          res.redirect('/');
     }

     app.all('/admin*', Authed);
          app.use(function(req, res, next){
          res.locals.admin = req.user;
          next();
     });


     /*
     |--------------------------------------------------------------------------
     | Index
     |--------------------------------------------------------------------------
     */

     app.get('/', function(req, res) {
          res.render('index');
     });

     app.get('/admin', function(req, res) {
          res.render('admin/index', { user : req.user });
     });


     /*
     |--------------------------------------------------------------------------
     | Logout
     |--------------------------------------------------------------------------
     */

     app.get('/logout', function(req, res){
          req.logout();
          res.redirect('/');
     });


     /*
     |--------------------------------------------------------------------------
     | Auth Failures
     |--------------------------------------------------------------------------
     */

     app.get('/failure', function(req, res) {
          res.send(500);
     });

};