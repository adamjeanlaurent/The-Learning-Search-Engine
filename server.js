const express = require('express');
const bodyParser = require('body-parser');
const {SERVER_PORT} = require('./config.json');

const twitterRoutes = require('./routes/api/twitter');
const mediumRoutes = require('./routes/api/medium');
const youtubeRoutes = require('./routes/api/youtube');

const app = express();

// body parser middleware
app.use(bodyParser.json());

// api post endpoints
app.use('/api/youtube', youtubeRoutes);
app.use('/api/medium', mediumRoutes);
app.use('/api/twitter', twitterRoutes);

app.listen(SERVER_PORT, () => {
    console.log(`Server Running On Port ${SERVER_PORT}!`);
});