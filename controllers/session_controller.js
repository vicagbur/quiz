//var models = require('../models/models.js');

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
