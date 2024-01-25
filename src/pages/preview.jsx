import React from "react";
import { useParams } from "react-router-dom";

function Preview () {

    const current_article_id = useParams();

    return (
        <div>Welcome to previews: {current_article_id.article_id} </div>
    );
}

export default Preview;
