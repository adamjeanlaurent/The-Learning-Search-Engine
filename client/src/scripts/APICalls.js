import axios from "axios";

export default function FetchDataFromAPIS(searchTerm) {
    var results = {};
    axios
        .all([
            axios.get(`http://localhost:3000/api/twitter/${searchTerm}`),
            axios.get(`http://localhost:3000/api/medium/${searchTerm}`),
            axios.get(`http://localhost:3000/api/youtube/${searchTerm}`),
        ])
        .then((responseArr) => {
            results.twitterRes = responseArr[0].data;
            results.mediumRes = responseArr[1].data;
            results.youtubeRes = responseArr[2].data;
        })
        .catch((error) => {
            results.error = error;
        });

    return results;
}
