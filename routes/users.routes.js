const express = require('express');
const USERS = require('../db/users.db');
const  { uniqueUserCheck, validateRegistrationInput, validateUser } = require("../middlewares/validate.middleware")
const router = express.Router();

const { createUser, getUser , loginUser  } = require("../controllers/users.controller");

const { getPreferences , updatePreferences } = require("../controllers/preferences.controller");



// router.post("/login", loginUser);

router.post("/signup",validateRegistrationInput, uniqueUserCheck, createUser);

router.post("/login", loginUser);



router.get('/preferences' , validateUser , getPreferences);

router.put('/preferences' , validateUser , updatePreferences);

module.exports = router;