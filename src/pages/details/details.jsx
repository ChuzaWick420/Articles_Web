import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import getData from "../../api/get";

function Details () {

    let loc = useLocation();
    let current_id = loc.pathname.split("/")[2];

    const[heading, setHeading] = useState("NULL");
    const[icon, setIcon] = useState("");
    const[content, setContent] = useState("null");

    useEffect(()=>{
        getData("details", current_id).then((data)=>{
            setHeading(data.heading);
            setIcon(data.icon_url);
            setContent(data.content);
        });
    }, []);

    return (
        <div>
            <div className="details_header">
                <h1>{heading}</h1>
                <img src={icon} />
            </div>
            <div className="details_content">
                {content}
            </div>
            <footer>
                
            </footer>
        </div>
    );
}

export default Details;
