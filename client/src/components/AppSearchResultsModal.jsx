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
    });
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
                });
            })
            .catch((error) => {
                updateApiData({
                    twitterAccounts: [],
                    mediumPosts: [],
                    youtubeVideos: [],
                });
            });
    }

    return (
        <div>
            <AppSearchBar search={FetchDataFromAPIs} />
            <Container className="mt-5">
                {apiData.youtubeVideos.map((vid, idx) => {
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
                                <AppSearchResult
                                    image={
                                        idx >= apiData.mediumPosts.length
                                            ? ""
                                            : apiData.mediumPosts[idx].image
                                    }
                                    title={
                                        idx >= apiData.mediumPosts.length
                                            ? ""
                                            : apiData.mediumPosts[idx].title
                                    }
                                    link={
                                        idx >= apiData.mediumPosts.length
                                            ? ""
                                            : apiData.mediumPosts[idx].link
                                    }
                                    key={uniqid()}
                                />
                            </Col>
                            <Col
                                key={uniqid()}
                                xs="4"
                                sm="4"
                                md="4"
                                lg="4"
                                xl="4"
                            >
                                <AppSearchResult
                                    image={vid.image}
                                    title={vid.title}
                                    link={vid.link}
                                    key={uniqid()}
                                />
                            </Col>
                            <Col
                                key={uniqid()}
                                xs="4"
                                sm="4"
                                md="4"
                                lg="4"
                                xl="4"
                            >
                                <AppSearchResult
                                    image={apiData.twitterAccounts[idx].image}
                                    title={apiData.twitterAccounts[idx].title}
                                    link={apiData.twitterAccounts[idx].link}
                                    key={uniqid()}
                                />
                            </Col>
                        </Row>
                    );
                })}

                {/* <div style={{ width: "33.3%", display: "inline-block" }}>
                    {apiData.mediumPosts.map((post) => {
                        return (
                            <Row key={uniqid()} className="mb-3">
                                <Col key={uniqid()} lg="11">
                                    <AppSearchResult
                                        image={post.image}
                                        title={post.title}
                                        link={post.link}
                                        key={uniqid()}
                                    />
                                </Col>
                            </Row>
                        );
                    })}
                </div>

                <div style={{ width: "33.3%", display: "inline-block" }}>
                    {apiData.youtubeVideos.map((vid) => {
                        return (
                            <Row key={uniqid()} className="mb-3">
                                <Col key={uniqid()} lg="11">
                                    <AppSearchResult
                                        image={vid.image}
                                        title={vid.title}
                                        link={vid.link}
                                        key={uniqid()}
                                    />
                                </Col>
                            </Row>
                        );
                    })}
                </div>

                <div style={{ width: "33.3%", display: "inline-block" }}>
                    {apiData.twitterAccounts.map((acc) => {
                        return (
                            <Row key={uniqid()} className="mb-3">
                                <Col key={uniqid()} lg="11">
                                    <AppSearchResult
                                        image={acc.image}
                                        title={acc.title}
                                        link={acc.link}
                                        key={uniqid()}
                                    />
                                </Col>
                            </Row>
                        );
                    })}
                </div> */}
            </Container>
        </div>
    );
}
