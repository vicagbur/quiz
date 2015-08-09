var users = { admin:  {id: 1, username: "admin",  password:"1234"},
              pepe:   {id: 2, username: "pepe",   password:"5678"}
            };

// Comprueba si el usuari está registrado en users
// Si autenticación falla o hay errores se ejecuta el callback(error).
exports.autenticar = function(login, password, callback) {
  console.log("login->"+login);
  console.log("password->"+password);
  if (users[login]) {
    if (password === users[login].password) {
      callback(null, users[login]);
    } else {
      callback(new Error('Password erróneo'));
    }
  } else {
    callback(new Error('No existe el usuario'));
  };
};