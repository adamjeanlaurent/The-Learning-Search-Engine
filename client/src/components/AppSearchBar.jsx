import React, { useState } from "react";
import { Container } from "reactstrap";
import ScriptTag from "react-script-tag";
import "../css/searchBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AppSearchBar(props) {
  function handleSearchButtonClick() {
    let sb = document.querySelector(".input-group-text");
    sb.style.backgroundColor = "white";

    setTimeout(() => {
      sb.style.backgroundColor = "";
    }, 100);

    // call function from props to populate and stuff in here too
  }

  return (
    <div>
      <ScriptTag
        type="text/javascript"
        src="https://kit.fontawesome.com/c76fb52376.js"
      />
      <Container>
        <div className="md-form mt-0 searchBar">
          <div className="input-group-text" onClick={handleSearchButtonClick}>
            <i className="fas fa-search"></i>
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
