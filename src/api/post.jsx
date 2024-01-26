async function postData (article_id, likes = 0, dislikes = 0) {
    
    let url = `http://localhost:1337/api/articles/${article_id}`;

    let response = await fetch(url, {
        
        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            data: {
                "likes": `${likes}`,
                "dislikes": `${dislikes}`
            }
        })
    })

    return response;
}

export default postData;
