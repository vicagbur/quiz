
//MW de autorización de HTTP restringidos
exports.loginRequired = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

//MW de control de sesión
exports.validSession = function (req, res, next) {
  if (req.session.last_timestamp) {
    //console.log("LAST_TS->"+req.session.last_timestamp);
    //console.log("NEW_TS->"+req.session.new_timestamp);
    var last_ts = new Date(req.session.last_timestamp);
    var new_ts = new Date(req.session.new_timestamp);
    console.log("LAST_TS_DATE->"+last_ts);
    console.log("NEW_TS_DATE->"+new_ts);
    var diff = new_ts.getTime() - last_ts.getTime();
    console.log("TS_DIFF->"+ diff +":"+ (diff > (2 * 60 * 1000)));
    //destroy the session if diff > 2 minutes
    //if (diff > (2 * 60 * 1000)) {
    if (diff > (2 * 60 * 1000)) {
      delete req.session.user;
    }
  }
  next();
}


//GET /login
exports.new = function(req, res) {
  var errors = req.session.errors || {};
  req.session.errors = {};

  res.render('sessions/new', {errors: errors});
};

//POST /login
exports.create = function(req, res) {
  var login = req.body.login;
  var password = req.body.password;

  var userController = require('./user_controller');
  userController.autenticar(login, password, function (error, user) {
    if (error) {
      req.session.errors = [{"message": 'Se ha producido un error' + error}];
      res.redirect("/login");
      return;
    }

    // crear req.session.user y guardar campos id y username
    // la sesión se define por la existencia de req:session.user
    req.session.user = {id:user.id, username:user.username};
    res.redirect(req.session.redir.toString()); //redirección a path anterior a login
  });
};

//DELETE /logout
exports.destroy = function(req, res) {
  delete req.session.user;
  res.redirect(req.session.redir.toString()); //redirección a path anteriro a logout
};
