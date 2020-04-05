const express = require('express');
const twitter = require('twitter');
const {TWITTER} = require('../../config.json'); 
const router = express.Router();

// @route GET api/twitter
// @desc Get Twitter Accounts By Search Term
// @access Need Twitter API Credentials

router.get('/', (req, res) => {
    let searchTerm = req.body.searchTerm;

    searchTerm = searchTerm.replace(/ /g,"%20");

    const client = new twitter({
        consumer_key: TWITTER.CONSUMER_KEY,
        consumer_secret: TWITTER.CONSUMER_SECRET,
        access_token_key: TWITTER.ACCESS_TOKEN_KEY,
        access_token_secret: TWITTER.ACCESS_TOKEN_SECRET
    });

    const params = {q: searchTerm};

    client.get('users/search', params, (error, twitterAccounts, response) => {
        if(!error) {
            res.send(twitterAccounts);
        }
        else {
            res.send(error);
        }
    });
});

module.exports = router;