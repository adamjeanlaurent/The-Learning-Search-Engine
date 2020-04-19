const express = require("express");
const request = require("request");
const searchResult = require("../../models/searchResult");

function parseMediumPosts(json) {
  let result = [];
  for (let post of json.posts) {
    // for the last one, if the article has a previewImage use that, otherwise use the profile picture of the author
    result.push(
      new searchResult(
        post.title,
        `medium.com/@${post.creator.username}/${post.uniqueSlug}`,
        `cdn-images-1.medium.com/${
          post.virtuals.previewImage.imageId
            ? post.virtuals.previewImage.imageId
            : post.creator.imageId
        }`
      )
    );
  }
  return result;
}

// @route GET api/medium
// @desc Get Medium Posts By Search Term, Limit is 10 Per Call For Now
// @access

const router = express.Router();
router.get("/:searchTerm", (req, res) => {
  let searchTerm = req.params.searchTerm;
  searchTerm = searchTerm.replace(/ /g, "%20");
  let url = `https://medium.com/search?q=${searchTerm}`;

  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // What this regex says "find something that starts with any number of { then "posts" then any number of any characters, until it find a } (somehow this works idk man)
      let regex = /{+"posts".+}/g;
      // parses the posts JSON from the html
      const postsJson = body.match(regex);

      // this removes all the \'s from the html because it was causing issues and escaping strings, it also removes any \"
      postsJson[0] = postsJson[0].replace(/(\\"|\\)/g, "");

      try {
        let json = JSON.parse(postsJson[0]);
        return res.send(parseMediumPosts(json));
      } catch (e) {
        res.send("error occurred");
      }
    } else {
      return res.send(error);
    }
  });
});

module.exports = router;
