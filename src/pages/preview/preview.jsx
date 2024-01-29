import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Preview () {

    const para_article_id = useParams();
    const [activeArticleID, setActiveArticleID] = useState(0);
    const [activeCategoryID, setActiveCategoryID] = useState(0);

    useEffect(()=>{
        setActiveArticleID(para_article_id);
    }, []);

    return (
        <div className="preview_page">
            <div className="main">
                <div className="preview_header">
                    <h1></h1>
                    <img></img>
                </div>
                <Link to = {`../preview/${para_article_id.article_id}/details`}>
                    <button>Read More</button>
                </Link>
                <footer className="preview_footer"></footer>
            </div>
            <div className="sub"></div>
        </div>
    );
}

export default Preview;
