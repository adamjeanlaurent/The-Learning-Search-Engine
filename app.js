const express = require('express');
const bodyParser = require('body-parser');

const twitterRoutes = require('./routes/twitter');
const mediumRoutes = require('./routes/medium');
const youtubeRoutes = require('./routes/youtube');

const app = express();

app.use(bodyParser.json());

app.use('/api/youtube', youtubeRoutes);
app.use('/api/medium', mediumRoutes);
app.use('/api/twitter', twitterRoutes);


app.listen(3000, () => {
    console.log('Server Running On Port 3000!');
});