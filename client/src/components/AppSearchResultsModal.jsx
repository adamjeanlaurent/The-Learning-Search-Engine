import React, { useEffect, useState } from "react";

import { Container } from "reactstrap";

import axios from "axios";

// import FetchDataFromAPIS from "../scripts/APICalls";

// NOTE THIS SEEMS TO WORK ?? but somehow I exceeded my number of api calls for the day
// https://console.developers.google.com/apis/api/youtube.googleapis.com/quotas?project=bites-for-me
// https://www.youtube.com/watch?v=12l6lkW6JhE

export default function AppSearchResultsModal(props) {
    // let resp = FetchDataFromAPIS("soccer");
    // console.log(resp);
    let searchTerm = "soccer";

    const [apidata, updateapidata] = useState();

    axios
        .all([
            axios.get(`http://localhost:3000/api/twitter/${searchTerm}`),
            axios.get(`http://localhost:3000/api/medium/${searchTerm}`),
            axios.get(`http://localhost:3000/api/youtube/${searchTerm}`),
        ])
        .then((responseArr) => {
            updateapidata(responseArr);
        })
        .catch((error) => {
            console.log(error);
            updateapidata("error happend man");
        });

    return (
        <div>
            <Container className="mt-5">{apidata}</Container>
        </div>
    );
}

/*
    We are going to have a dynamic number of rows, each rows has 3 columns
    going to have to think about how we want to rows to collapse in the future
*/
