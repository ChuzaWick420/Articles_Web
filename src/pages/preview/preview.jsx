import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import getData from "../../api/get";

import "./preview.css";

function Preview () {

    const para_article_id = useParams();
    const [activeArticleID, setActiveArticleID] = useState(para_article_id.article_id);
    const [activeCategoryID, setActiveCategoryID] = useState(0);
    const [header, setHeader] = useState("null");
    const [iconURL, setIconURL] = useState("null");
    const [footer, setFooter] = useState("null");
    const [categoryCards, setCategoryCards] = useState([]);

    let cards = [];

    useEffect(()=>{
        
        getData("category_cards").then((result)=>{
            setCategoryCards(result);
        });
        
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
        setActiveArticleID(para_article_id.article_id);
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
            <div className="sub">
                <div className="search_bar">
                    <input type="text" placeholder="category" />
                    <span className="material-symbols-outlined">search</span>
                </div>
                <div className="category_list">
                    {categoryCards.map((element, index)=>{
                        return (
                            <Link to={`../preview/${element.article_id}`} key={index}>
                                <div className="category_card" onClick={()=>{
                                    setActiveCategoryID(index + 1);
                                }}>
                                    <div>
                                        <h6>{element.name}</h6>
                                        {element.content}
                                    </div>
                                    <div className="img_container" style={{"background-image": `url(${element.icon_url})`}} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Preview;
