import React from "react";

import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    CardLink,
} from "reactstrap";

export default function AppSearchResult(props) {
    return (
        <div>
            <Card>
                <CardImg
                    top
                    width="90%"
                    src={props.image}
                    alt="Alternate Image"
                />
                <CardBody>
                    <CardTitle>{props.title}</CardTitle>
                    <CardLink href={props.link}>Link</CardLink>
                </CardBody>
            </Card>
        </div>
    );
}
