import React from "react";
import { Row, Col } from "reactstrap";

import "../css/App.css";

export default function AppLogoColumnBar() {
    return (
        <div>
            <Row>
                <Col xs="4" sm="4" md="4" lg="4" xl="4">
                    <img
                        src="/mediumIcon.png"
                        alt="medium logo"
                        style={{ width: "30%", height: "70%" }}
                        className="columnLogo"
                    />
                </Col>
                <Col xs="4" sm="4" md="4" lg="4" xl="4">
                    <img
                        src="youtubeIcon.png"
                        alt="Youtube logo"
                        style={{ width: "30%", height: "70%" }}
                        className="columnLogo"
                    />
                </Col>
                <Col xs="4" sm="4" md="4" lg="4" xl="4">
                    <img
                        src="/twitterIcon.png"
                        alt="Twitter logo"
                        style={{ width: "30%", height: "70%" }}
                        className="columnLogo"
                    />
                </Col>
            </Row>
        </div>
    );
}
