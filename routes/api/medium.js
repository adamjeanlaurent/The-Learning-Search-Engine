const express = require('express');
const request = require('request');
const searchResult = require('../../models/searchResult');

function parseMediumPosts(json) {
    let result = [];
    for(let post of json.posts) {
        result.push(new searchResult(post.title, ));
    }
}

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
            
            // this removes all the \'s from the html because it was causing issues and escaping strings, it also removes any \" 
            postsJson[0] = postsJson[0].replace(/(\\"|\\)/g, '');
            let str = '';
    
            console.log(postsJson[0]);
            try {
                let json = JSON.parse(postsJson[0]);
                return res.send(json);
            }

            catch(e) {
                console.log(e);
                res.send('hello');
            }
        }

        else {
           res.send(error);
        }
    });
});

module.exports = router;