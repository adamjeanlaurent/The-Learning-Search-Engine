import React from "react";
import { Container } from "reactstrap";
import "../css/searchBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "@material-ui/icons/Search";

export default function AppSearchBar(props) {
    function handleSearchButtonClick() {
        let sb = document.querySelector(".input-group-text");
        sb.style.backgroundColor = "white";

        setTimeout(() => {
            sb.style.backgroundColor = "";
        }, 100);

        props.search("soccer");
    }

    return (
        <div>
            <Container>
                <div className="md-form mt-0 searchBar">
                    <div
                        className="input-group-text"
                        onClick={handleSearchButtonClick}
                    >
                        {/* <i className="fas fa-search"></i> */}
                        <Search />
                    </div>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="I Want To Learn About ...."
                        aria-label="Search"
                        autoComplete="false"
                    />
                </div>
            </Container>
        </div>
    );
}
