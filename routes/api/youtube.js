const express = require('express');
const request = require('request');
const {YOUTUBE} = require('../../config.json');
const searchResult = require('../../models/searchResult');
const router = express.Router();


function parseYouTubeVideos(json) {
    let result = [];
    for(let vid of json.items) {
        result.push(new searchResult(vid.snippet.title, `https://www.youtube.com/watch?v=${vid.id.videoId}`, vid.snippet.thumbnails.medium.url));
    }
    return result;
}

// @route GET api/youtube
// @desc Get YouTube Videos By Search Term
// @access Need YouTube API Credentials

router.get('/', (req, res) => {
    let searchTerm = req.body.searchTerm;
    searchTerm = searchTerm.replace(/ /g,"%20");
    
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&type=video&key=${YOUTUBE.API_KEY}&maxResults=${10}`;
    
    request(url , (error, response, body) => {
        if(!error) {
            let json = JSON.parse(body);
            res.json(parseYouTubeVideos(json));
        }
        else {
            res.send(error);
        }
    });
});

module.exports = router;