const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

const userRoute = require('./routes/users.routes');
const preferencesRoute = require('./routes/preferences.routes');
const newsRoute = require('./routes/news.routes');

app.use('/users' ,userRoute );
app.use('/preferences' ,preferencesRoute );
app.use('/news' ,newsRoute );



module.exports = app;