import parse from "html-react-parser";

async function getData(request_type, article_id = 0) {

    let url = ``;
    let response;
    let result;

    switch(request_type) {
        case "category_names":
            url = `http://localhost:1337/api/categories`;
            response = await fetch(url);
    
            result = await response.json();
    
            let entries = result["data"];
    
            let categories = [];

            for (let i = 0; i < entries.length; i++) {
                categories.push({
                    name: entries[i]["attributes"]["name"],
                    category_id: entries[i]["id"]
                });
            }
    
            return categories;

        case "details":
            url = `http://localhost:1337/api/articles?filters[id][$eq]=${article_id}&populate=category&populate=icon`;
            response = await fetch(url);

            result = await response.json();

            let data = result["data"][0]["attributes"]
            let content = parse(data["content"]);

            return {
                heading: data["heading"],
                likes: data["likes"],
                dislikes: data["dislikes"],
                content: content,
                category_name: data["category"]["data"]["attributes"]["name"],
                category_id: data["category"]["data"]["id"],
                icon_url: "http://localhost:1337" + data["icon"]["data"][0]["attributes"]["formats"]["small"]["url"]
            };

    }

    return null;

}

export default getData;
