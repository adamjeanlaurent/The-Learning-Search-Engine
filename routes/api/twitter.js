const express = require("express");
const twitter = require("twitter");
const { TWITTER } = require("../../config.json");
const searchResult = require("../../models/searchResult");
const router = express.Router();

function parseTwitterAccounts(json) {
    let result = [];

    for (let acc of json) {
        result.push(
            new searchResult(
                acc.name,
                `twitter.com/${acc.screen_name}`,
                acc.profile_image_url_https
            )
        );
    }
    return result;
}

// @route GET api/twitter
// @desc Get Twitter Accounts By Search Term
// @access Need Twitter API Credentials

router.get("/:searchTerm", (req, res) => {
    console.log("hello");
    // res.setHeader(
    //   "Access-Control-Allow-Headers",
    //   "Origin, X-Requested-With, Content-Type, Accept"
    // );
    let searchTerm = req.params.searchTerm;

    searchTerm = searchTerm.replace(/ /g, "%20");

    const client = new twitter({
        consumer_key: TWITTER.CONSUMER_KEY,
        consumer_secret: TWITTER.CONSUMER_SECRET,
        access_token_key: TWITTER.ACCESS_TOKEN_KEY,
        access_token_secret: TWITTER.ACCESS_TOKEN_SECRET,
    });

    const params = { q: searchTerm, count: 10 };

    client.get("users/search", params, (error, twitterAccounts, response) => {
        if (!error) {
            res.send(parseTwitterAccounts(twitterAccounts));
        } else {
            res.send(error);
        }
    });
});

module.exports = router;
