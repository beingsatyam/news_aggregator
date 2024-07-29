
const USERS = require("../db/users.db");


function getPreferences(req , res) {

    console.log("preferecnses")
    const userId = req.userId;
    const user = USERS.find((value) => value.id == userId);

    res.json({
        "preferences" : user.preferences
    });
    
};


function updatePreferences(req , res) {

    console.log("preferecnses")


    const preferences = req.body.preferences;
    const userId = req.userId;

    const user = USERS.find((value) => value.id == userId);
    console.log(USERS);
    console.log(preferences);

    if (user) {

        user.preferences = preferences;

        console.log(USERS);
        res.status(200).json({
            message : "preferences updated!"
        });

    } else {

        res.status(404).send({
            message: 'User not found!'
        });
    }

    
};


module.exports = { getPreferences  , updatePreferences };