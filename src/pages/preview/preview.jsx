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

    useEffect(()=>{
        let cards = [];
        setActiveArticleID(para_article_id);
        
        getData("category_cards").then((result)=>{
            for (let card of result) {
                let index = result.indexOf(card) + 1;
                cards.push(
                    <Link to={`../preview/${index}`}>
                        <div className="category_card" key={index} onClick={()=>{
                            setActiveCategoryID(index);
                        }}>
                            <div>
                                <h6>{card.name}</h6>
                                {card.content}
                            </div>
                            <div className="img_container" style={{"background-image": `url(${card.icon_url})`}} />
                        </div>
                    </Link>
                );
            }
        });

        setCategoryCards(cards);
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
                    {categoryCards}
                </div>
            </div>
        </div>
    );
}

export default Preview;
