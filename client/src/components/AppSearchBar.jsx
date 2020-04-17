import React, { useState } from "react";
import { Container } from "reactstrap";
import ScriptTag from "react-script-tag";
import "../css/searchBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AppSearchBar(props) {
  return (
    <div>
      <ScriptTag
        type="text/javascript"
        src="https://kit.fontawesome.com/c76fb52376.js"
      />
      <Container>
        <div className="md-form mt-0 searchBar">
          <div class="input-group-text">
            <i class="fas fa-search"></i>
          </div>
          <input
            className="form-control"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
      </Container>
    </div>
  );
}
