import React from "react";
import { Link } from "react-router-dom";

function Landing () {
    return (
        <div className="landing_page">

            <h1>Welcome to <span className="website_name">Articles Web</span></h1>
            
            <button>
                <Link to="preview">Read Articles</Link>
            </button>
            
        </div>
    );
}

export default Landing;
