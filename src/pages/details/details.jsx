import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Details () {

    let loc = useLocation();
    let current_id = loc.pathname.split("/")[2];

    const [activeArticleID, setActiveArticleID] = useState(current_id);

    return (
        <div>
            <div className="details_header">
                <h1></h1>
                <img />
            </div>
            <div className="details_content">

            </div>
            <footer>
                
            </footer>
        </div>
    );
}

export default Details;
