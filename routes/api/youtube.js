const express = require('express');
const request = require('request');
const {YOUTUBE} = require('../../config.json');
const router = express.Router();

// @route GET api/youtube
// @desc Get YouTube Videos By Search Term
// @access Need YouTube API Credentials

router.get('/', (req, res) => {
    let searchTerm = req.body.searchTerm;
    searchTerm = searchTerm.replace(/ /g,"%20");
    
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&key=${YOUTUBE.API_KEY}`;
    
    request(url , (error, response, body) => {
        if(!error) {
            res.json(JSON.parse(body));
        }
        else {
            res.send(error);
        }
    });
});

module.exports = router;