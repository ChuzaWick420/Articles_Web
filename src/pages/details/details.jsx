import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import getData from "../../api/get";
import postData from "../../api/post";

import "./details.css";

function Details () {

    let loc = useLocation();
    let current_id = loc.pathname.split("/")[2];

    const[heading, setHeading] = useState("NULL");
    const[icon, setIcon] = useState("");
    const[content, setContent] = useState("null");
    const[likes, setLikes] = useState(0);
    const[dislikes, setDislikes] = useState(0);
    const[footer, setFooter] = useState("null");
    const[activeButton, setActiveButton] = useState("null");
    const[likes_active, setLikes_active] = useState("material-symbols-outlined");
    const[dislikes_active, setDislikes_active] = useState("material-symbols-outlined");
    const[activeArticleID, setActiveArticleID] = useState(current_id);

    useEffect(()=>{
        
        getData("details", current_id).then((data)=>{
            setHeading(data.heading);
            setIcon(data.icon_url);
            setContent(data.content);
            setLikes(data.likes);
            setDislikes(data.dislikes);
        });
        
    }, [activeArticleID]);

    useEffect(()=>{
        getData("footer", current_id).then((result)=>{
            let footers = [];
            for (let x = 0; x < result.footer_list_content.length; x++){
                footers.push(
                    <Link to={`../preview/${result.footer_list_IDs[x]}/details`} key={x} >
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
    }, []);
    
    let updatedLikes = likes;
    let updatedDislikes = dislikes;

    //updates buttons appearance
    useEffect(()=>{
      
        switch (activeButton) {
     
            case "like":
                setLikes_active("material-symbols-outlined active_button");
                setDislikes_active("material-symbols-outlined");
                break;
    
            case "dislike":
                setDislikes_active("material-symbols-outlined active_button");
                setLikes_active("material-symbols-outlined");
                break;

            default:
                setLikes_active("material-symbols-outlined");
                setDislikes_active("material-symbols-outlined");
                break;
        }

    }, [activeButton]);

    return (
        <div className="details_page">
            <div className="details_header">
                <h1>{heading}</h1>
                <img src={icon} />
            </div>
            <div className="details_content">
                {content}
            </div>
            <div className="details_buttons">
                <button onClick={()=>{
                    switch(activeButton) {
                        case "like":
                            updatedLikes = likes - 1;
                            setActiveButton("null");
                            break;
                        case "dislike":
                            updatedLikes = likes + 1;
                            updatedDislikes = dislikes - 1;
                            setActiveButton("like");
                            postData(current_id, updatedLikes, updatedDislikes);
                            setLikes(updatedLikes);
                            setDislikes(updatedDislikes);
                            return;
                        default:
                            updatedLikes = likes + 1;
                            setActiveButton("like");
                            break;
                    }
                    setLikes(updatedLikes);
                    setDislikes(updatedDislikes);
                    postData(current_id, updatedLikes, -1);
                }}>
                    <span className={likes_active}>
                        thumb_up
                    </span>
                    | {likes}
                </button>

                <button onClick={()=>{
                    switch(activeButton) {
                        case "like":
                            updatedLikes = likes - 1;
                            updatedDislikes = dislikes + 1;
                            setActiveButton("dislike");
                            setLikes(updatedLikes);
                            setDislikes(updatedDislikes);
                            postData(current_id, updatedLikes, updatedDislikes);
                            return;
                        case "dislike":
                            updatedDislikes = dislikes - 1;
                            setActiveButton("null");
                            break;
                        default:
                            updatedDislikes = dislikes + 1;
                            setActiveButton("dislike");
                            break;
                    }
                    setLikes(updatedLikes);
                    setDislikes(updatedDislikes);
                    postData(current_id, -1, updatedDislikes);
                }}>
                    <span className={dislikes_active}>
                        thumb_down
                    </span>
                    | {dislikes}
                </button>
            </div>
            <footer className="details_footer">
               {footer} 
            </footer>
        </div>
    );
}

export default Details;
