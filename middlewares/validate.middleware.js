const jwt = require("jsonwebtoken");
const USERS = require("../db/users.db");


function uniqueUserCheck(req, res, next) {
  const { username } = req.body;

  const user = USERS.find((value) => value.username == username);

  if (user) {
      res.status(422).json(
          { message: 'username already exists!' })
  }

  else {
      next();
  };


};

function validateRegistrationInput(req, res, next) {

  const mandatoryFields = ['name' , 'email', 'password' , 'preferences']

  const missingFields = []

  for(field of mandatoryFields){
    if (!req.body[field]){

      missingFields.push(field);

    }
  };

  if (missingFields.length > 0){
    res.status(400).json(
      { message:  `one or more manadatory fields are missing : ${missingFields.join(',')}` })
  }

  else {
      next();
  };


};


function validateUser(req, res, next) {
  const jwtSecret = process.env.JWT_SECRET;

  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      message: "Login Required!!!",
    });
  }
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Login Required!!!",
    });
  } else {
    jwt.verify(token, jwtSecret, (error, decodedString) => {
      if (error && error.message === "jwt expired") {
        res.status(302).send("Redirect to login!");
      }

      if (error) {
        res.status(401).json({
          message: "Incorrect password!",
        });
      } else {

        const userId = decodedString.user.id;

        req.userId = userId

        next();
      }
    });
  }
}

module.exports = { validateUser,uniqueUserCheck,validateRegistrationInput };