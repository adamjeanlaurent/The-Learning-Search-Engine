const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req,res) => {
    let searchTerm = req.body.searchTerm;
    searchTerm = searchTerm.replace(/ /g ,"%20");

    let url = `https://medium.com/search?q=${searchTerm}`;

    request(url, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            // What this regex says "find something that starts with any number of { then "posts" then any number of any characters, until it find a } (somehow this works idk man)
            let regex = /{+"posts".+}/g;
            // parses the posts JSON from the html
            const postsJson = body.match(regex);
            
            // this removes all the \'s from the html because it was causing issues and escaping strings
            postsJson[0] = postsJson[0].replace(/\\/g, '');
            
            try {
                let json = JSON.parse(postsJson[0]);
                return res.send(json);
            }

            catch(e) {
                res.send('hello');
            }
        }

        else {
           res.send(error);
        }
    });
});

module.exports = router;