const express = require('express');
const  { validateUser } = require("../middlewares/validate.middleware")
const router  = express.Router();

const { getPreferences , updatePreferences } = require("../controllers/preferences.controller");


router.get('/' , validateUser , getPreferences);

router.put('/' , validateUser , updatePreferences)

module.exports = router;