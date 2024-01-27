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

        case "footer":
            let details = await getData("details", article_id)
            url = `http://localhost:1337/api/articles?sort=likes:desc&populate=category&filters[category][filters[name][$eq]]=${details.category_name}&pagination[pageSize]=6`;

            response = await fetch(url);

            result = await response.json();

            let footer_list = [];

            let tempDiv = document.createElement("div");
            
            for (let i = 0; i < result["data"].length; i++) {
                tempDiv.innerHTML = result["data"][i]["attributes"]["content"];
                let ele = tempDiv.querySelector("p");
                footer_list.push(
                    parse(ele.innerHTML)
                );
            }

            return {
                category_name: result["data"][0]["attributes"]["category"]["data"]["attributes"]["name"],
                footer_list_content: footer_list
            };

    }

    return null;

}

export default getData;
