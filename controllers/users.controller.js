const bcrypt = require("bcrypt");
const USERS = require("../db/users.db");
const jwt = require("jsonwebtoken");
require('dotenv').config();

async function createUser(req, res) {
    try {

      const { name , email, password , preferences } = req.body;

      const hashedPassword =  await bcrypt.hash(password , 10);

      console.log(hashedPassword);

      const _id =  USERS.length ? USERS.length+1  : 1

      const userObj = {
        id : _id,
        name: name,
        email : email,
        password : hashedPassword,
        preferences : preferences ? preferences : []
      };

      USERS.push(userObj);

      res.json({
        message : 'user registered successfully!'
      });
      
    } catch (error) {
      res.json({
        message: "SOME ERROR OCCURED  " + error.message,
        status: 500,
      });
    }
  };
  


function getUser(req , res) {

    res.json(
        USERS
    );

}


async function loginUser(req, res) {
    try {
      const secret = process.env.JWT_SECRET;
      console.log(secret);
      const { email, password } = req.body;
      // console.log(email, password  ,USERS);


  
      const user = USERS.find((value) => value.email == email);
      if (!user) {

        return res.status(401).json({
          message: 'email not found!'
        });
      }

      const id = user.id;
       
      const validatePassword = await bcrypt.compare(
        password,
        user.password
      );
  
      if (user && validatePassword) {
        const payload = {
          user: { id  },
        };
  
        const authToken = jwt.sign(payload, secret, { expiresIn: 600000000 });
  
        res.json({
          status: 200,
          message: "Authencation Success",
          token: authToken,
        });
      } else {
        // res.setStatus = 200
        res.status(401).json({
          status: 401,
          message: "Authencation Failed",
        });
      }
    } catch (error) {
      res.json({
        status: 500,
        message: error.message,
      });
    }
  }
  
  module.exports = { createUser , getUser , loginUser };
