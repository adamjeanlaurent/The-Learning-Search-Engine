import React from "react";

import AppSearchBar from "./AppSearchBar";
import AppNavBar from "./AppNavbar";
import AppSearchResultsModal from "./AppSearchResultsModal";

export default function LearningSearchEngine() {
    return (
        <div>
            <AppNavBar />
            <AppSearchBar />
            <AppSearchResultsModal />
        </div>
    );
}
