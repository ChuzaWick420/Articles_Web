import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import getData from "../../api/get";

import "./preview.css";

function Preview () {

    const para_article_id = useParams();
    const [activeArticleID, setActiveArticleID] = useState(1);
    const [activeCategoryID, setActiveCategoryID] = useState(0);
    const [header, setHeader] = useState("null");
    const [iconURL, setIconURL] = useState("null");
    const [footer, setFooter] = useState("null");

    useEffect(()=>{
        setActiveArticleID(para_article_id);
    }, []);

    //send get requests to populate content
    useEffect(()=>{
        getData("details", para_article_id.article_id).then((result)=>{
            setHeader(result.heading);
            setIconURL(result.icon_url);
        });
    }, [activeArticleID]);

    //update footer when category id updates
    useEffect(()=>{
        getData("footer", para_article_id.article_id).then((result)=>{
            setFooter(result.footer_list_content);
        });
    }, [activeCategoryID]);

    return (
        <div className="preview_page">
            <div className="main">
                <div className="preview_header">
                    <h1>{header}</h1>
                    <img src={iconURL} width={400}></img>
                </div>
                <Link to = {`../preview/${para_article_id.article_id}/details`}>
                    <button>Read More</button>
                </Link>
                <footer className="preview_footer">{footer}</footer>
            </div>
            <div className="sub"></div>
        </div>
    );
}

export default Preview;
