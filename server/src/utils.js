const User = require('./db/User');

function validatePasswords(pass, conf_pass) {
  if (pass && conf_pass) {
    const password = pass.trim();
    const conf_password = conf_pass.trim();

    return password === conf_password;
  }
  return false;
}

function checkAuth(req, res, next) {
  return req.session.user_id
    ? next()
    : res.status(401).send("Unauthorized");
}

function findUser(req, res, next) {
  User.findById(req.session.user_id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => handleMongooseError(err, res));
}

function handleMongooseError(err, res) {
  console.log(err);
  switch (err.name) {
    case 'CastError':
    case 'TypeError':
    case 'ValidationError':
      return res.status(400).end();
    default:
      return res.status(500).end();
  }
}

module.exports = {
  validatePasswords,
  checkAuth,
  findUser,
  handleMongooseError
};