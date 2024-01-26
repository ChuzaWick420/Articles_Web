async function postData (article_id, likes = -1, dislikes = -1) {
    
    let url = `http://localhost:1337/api/articles/${article_id}`;

    let data = {}

    if (likes != -1)
        Object.assign(data, {
            "likes": `${likes}`
        })

    if (dislikes != -1)
        Object.assign(data, {
            "dislikes": `${dislikes}`
        });

    let response = await fetch(url, {
        
        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            data: data
        })
    })

    return response;
}

export default postData;
