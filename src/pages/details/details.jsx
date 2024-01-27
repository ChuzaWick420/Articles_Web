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
                    postData(current_id, likes + 1, -1).then((response)=>{
                        console.log("Success");
                        console.log(response);
                        //update the state as well
                        setLikes(likes + 1);
                    });
                }}>
                    <span class="material-symbols-outlined">
                        thumb_up
                    </span>
                    | {likes}
                </button>

                <button onClick={()=>{
                    postData(current_id, -1, dislikes + 1).then((response)=>{
                        console.log("Success");
                        console.log(response);
                        //update the state as well
                        setDislikes(dislikes + 1);
                    });
                }}>
                    <span class="material-symbols-outlined">
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
