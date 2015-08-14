var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId
router.param('commentId', commentController.load);

//Definición de rutas de sesión
router.get('/login',    sessionController.new);     //formulario de login
router.post('/login',   sessionController.create);  //crear sesión
router.get('/logout',   sessionController.destroy); //destruir sesión

// Definición de rutas de /quizes
router.get('/quizes',                       sessionController.validSession, quizController.index);
router.get('/quizes/:quizId(\\d+)',         sessionController.validSession, quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  sessionController.validSession, quizController.answer);
router.get('/quizes/new',                   sessionController.validSession, sessionController.loginRequired, quizController.new);
router.post('/quizes/create',               sessionController.validSession, sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',    sessionController.validSession, sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',         sessionController.validSession, sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',      sessionController.validSession, sessionController.loginRequired, quizController.destroy);

//Definición de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new',  sessionController.validSession, commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',     sessionController.validSession, commentController.create);
//debería ser un put, porque acualtiza el comment
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
                                                  sessionController.validSession, sessionController.loginRequired, commentController.publish);


//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);

/* GET página de créditos. */
router.get('/author', sessionController.validSession, function(req, res) {
  res.render('author', {errors:[]});
});

module.exports = router;
