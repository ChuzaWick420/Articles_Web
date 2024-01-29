import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Preview () {

    const para_article_id = useParams();
    const [activeArticleID, setActiveArticleID] = useState(0);

    useEffect(()=>{
        setActiveArticleID(para_article_id);
    }, []);

    return (
        <div>Welcome to previews: {activeArticleID.article_id} </div>
    );
}

export default Preview;
