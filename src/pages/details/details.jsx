import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

    useEffect(()=>{
        
        getData("details", current_id).then((data)=>{
            setHeading(data.heading);
            setIcon(data.icon_url);
            setContent(data.content);
            setLikes(data.likes);
            setDislikes(data.dislikes);
        });
       
        getData("footer", current_id).then((result)=>{
            setFooter(result["footer_list_content"]);
        });

    }, []);

    //updates buttons appearance
    useEffect(()=>{
        if (activeButton == "like") {
            setLikes_active("material-symbols-outlined active_button");
            setDislikes_active("material-symbols-outlined");
        }
        else if (activeButton == "dislike") {
            setDislikes_active("material-symbols-outlined active_button");
            setLikes_active("material-symbols-outlined");
        }
        else {
            setLikes_active("material-symbols-outlined");
            setDislikes_active("material-symbols-outlined");
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
                    if (activeButton != "like") {
                        let updatedLikes = likes + 1;
                        setLikes(updatedLikes);
                        postData(current_id, updatedLikes, -1)
                        setActiveButton("like");
                    }
                    else {
                        let updatedLikes = likes - 1;
                        setLikes(updatedLikes);
                        postData(current_id, updatedLikes, -1)
                        setActiveButton("null");
                    }
                }}>
                    <span className={likes_active}>
                        thumb_up
                    </span>
                    | {likes}
                </button>

                <button onClick={()=>{
                    if (activeButton != "dislike") {
                        let updateDislikes = dislikes + 1;
                        setDislikes(updateDislikes);
                        postData(current_id, -1, updateDislikes);
                        setActiveButton("dislike");
                    }
                    else {
                        let updatedDislikes = dislikes - 1;
                        setDislikes(updatedDislikes);
                        postData(current_id, -1, updatedDislikes);
                        setActiveButton("null");
                    }
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
