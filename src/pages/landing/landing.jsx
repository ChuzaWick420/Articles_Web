import React from "react";
import { Link } from "react-router-dom";

import "./landing.css";

function Landing () {
    return (
        <div className="landing_page">

            <h1>Welcome to <span className="website_name">Articles Web</span></h1>
            
            <p>Click the button below to access the articles articles.</p>

            <Link to="preview">
                <button>
                    Read Articles
                </button>
            </Link>
            
        </div>
    );
}

export default Landing;
