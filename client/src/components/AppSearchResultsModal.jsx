import React, { useState } from "react";

import { Container, Row, Col } from "reactstrap";

import axios from "axios";

import uniqid from "uniqid";

import AppSearchBar from "./AppSearchBar";

import AppSearchResult from "./AppSearchResult";

// import FetchDataFromAPIS from "../scripts/APICalls";

// NOTE THIS SEEMS TO WORK ?? but somehow I exceeded my number of api calls for the day
// https://console.developers.google.com/apis/api/youtube.googleapis.com/quotas?project=bites-for-me
// https://www.youtube.com/watch?v=12l6lkW6JhE

export default function AppSearchResultsModal(props) {
    const [apiData, updateApiData] = useState({
        twitterAccounts: [],
        mediumPosts: [],
        youtubeVideos: [],
        dummyArr: [],
    });

    function contentExists(arr, idx) {
        return arr.length > idx;
    }

    function fillDummyArr(a1, a2, a3) {
        let dummyArr = [];
        let indexesToFill = Math.max(a1.length, a2.length, a3.length);
        for (let i = 0; i < indexesToFill; i++) {
            dummyArr.push(i);
        }
        return dummyArr;
    }

    function FetchDataFromAPIs(searchTerm) {
        axios
            .all([
                axios.get(`http://localhost:3000/api/twitter/${searchTerm}`),
                axios.get(`http://localhost:3000/api/medium/${searchTerm}`),
                axios.get(`http://localhost:3000/api/youtube/${searchTerm}`),
            ])
            .then((responseArr) => {
                updateApiData({
                    twitterAccounts: responseArr[0].data,
                    mediumPosts: responseArr[1].data,
                    youtubeVideos: responseArr[2].data,
                    dummyArr: fillDummyArr(
                        responseArr[0].data,
                        responseArr[1].data,
                        responseArr[2].data
                    ),
                });
            })
            .catch((error) => {
                updateApiData({
                    twitterAccounts: [],
                    mediumPosts: [],
                    youtubeVideos: [],
                    dummyArr: [],
                });
            });
    }

    return (
        <div>
            <AppSearchBar search={FetchDataFromAPIs} />
            <Container className="mt-5">
                {apiData.dummyArr.map((vid, idx) => {
                    return (
                        <Row key={uniqid()}>
                            <Col
                                key={uniqid()}
                                xs="4"
                                sm="4"
                                md="4"
                                lg="4"
                                xl="4"
                            >
                                {contentExists(apiData.mediumPosts, idx) ? (
                                    <AppSearchResult
                                        image={apiData.mediumPosts[idx].image}
                                        title={apiData.mediumPosts[idx].title}
                                        link={apiData.mediumPosts[idx].link}
                                        key={uniqid()}
                                    />
                                ) : (
                                    ""
                                )}
                            </Col>

                            <Col
                                key={uniqid()}
                                xs="4"
                                sm="4"
                                md="4"
                                lg="4"
                                xl="4"
                            >
                                {contentExists(apiData.youtubeVideos, idx) ? (
                                    <AppSearchResult
                                        image={apiData.youtubeVideos[idx].image}
                                        title={apiData.youtubeVideos[idx].title}
                                        link={apiData.youtubeVideos[idx].link}
                                        key={uniqid()}
                                    />
                                ) : (
                                    ""
                                )}
                            </Col>
                            <Col
                                key={uniqid()}
                                xs="4"
                                sm="4"
                                md="4"
                                lg="4"
                                xl="4"
                            >
                                {contentExists(apiData.twitterAccounts, idx) ? (
                                    <AppSearchResult
                                        image={
                                            apiData.twitterAccounts[idx].image
                                        }
                                        title={
                                            apiData.twitterAccounts[idx].title
                                        }
                                        link={apiData.twitterAccounts[idx].link}
                                        key={uniqid()}
                                    />
                                ) : (
                                    ""
                                )}
                            </Col>
                        </Row>
                    );
                })}
            </Container>
        </div>
    );
}
