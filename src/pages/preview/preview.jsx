import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import parse from "html-react-parser";
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
    const [filters, setFilters] = useState("");

    let cards = [];
    let loc = useLocation();

    useEffect(()=>{
        
        getData("category_cards").then((result)=>{
            let cards = [];
            for (let x = 0; x < result.length; x++) {

                if (filters == "") {
                    setCategoryCards(result);
                    return;
                }

                console.log(filters);

                if (filters.exec(result[x].name))
                    cards.push(result[x]);
            }
            setCategoryCards(cards);
        });

    }, [filters]);
    
    //send get requests to populate content
    useEffect(()=>{
        getData("details", para_article_id.article_id).then((result)=>{
            setHeader(result.heading);
            setIconURL(result.icon_url);
        });
    }, [activeArticleID, loc]);

    //update footer when category id updates
    useEffect(()=>{
        setActiveArticleID(para_article_id.article_id);
        getData("footer", para_article_id.article_id).then((result)=>{
            let footers = [];
            for (let x = 0; x < result.footer_list_content.length; x++){
                footers.push(
                    <Link to={`../preview/${result.footer_list_IDs[x]}`} key={x} >
                        <div className="footer_card" onClick={()=>{
                            setActiveArticleID(result.footer_list_IDs[x]);
                        }} >
                            <h6>{result.category_name}</h6>
                            <p>{parse(result.footer_list_content[x])}</p>
                        </div>
                    </Link>
                );
            }
            setFooter(footers);
        });
    }, [activeCategoryID, loc]);

    return (
        <div className="preview_page">
            <div className="main">
                {(()=>{
                    if(loc.pathname.split("/").length > 2) {
                        return (
                            <>
                                <div className="preview_header">    
                                    <h1>{header}</h1>
                                    <img src={iconURL} width={400}></img>
                                </div>
                                <Link to = {`../preview/${para_article_id.article_id}/details`}>
                                    <button>Read More</button>
                                </Link>
                                <footer className="preview_footer">{footer}</footer>
                            </>
                        );
                    }
                    else {
                        return (
                            <div>Welcome to preview</div>
                        );
                    }
                })()}
            </div>
            <div className="sub">
                <div className="search_bar">
                    <input className="search" type="text" placeholder="category" />
                    <span onClick={()=>{
                        //perform search and manipulate category cards
                        let bar = document.querySelector(".search");
                        if (bar.value == "") {
                            setFilters("");
                        }
                        else
                            setFilters(new RegExp(`\w*${bar.value}\w*`));
                    }} className="material-symbols-outlined">search</span>
                </div>
                <div className="category_list">
                    {categoryCards.map((element, index)=>{
                        return (
                            <Link to={`../preview/${element.article_id}`} key={index}>
                                <div className="category_card" onClick={()=>{
                                    setActiveCategoryID(element.category_id);
                                }}>
                                    <div className="category_text">
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
