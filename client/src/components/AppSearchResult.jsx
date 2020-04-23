import React from "react";

import { Card, CardImg, CardBody, CardTitle, CardLink } from "reactstrap";

import "../css/AppSearchResult.css";

export default function AppSearchResult(props) {
    return (
        <div>
            <Card className="searchResultCard">
                <CardImg
                    className="searchResultImage"
                    top
                    src={props.image}
                    alt="Alternate Image"
                />
                <CardBody>
                    <CardTitle className="searchResultBody">
                        {props.title}
                    </CardTitle>
                    <CardLink href={props.link}>Link</CardLink>
                </CardBody>
            </Card>
        </div>
    );
}
