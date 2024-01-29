import React from "react";
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

        case "category_cards":
            let cards = [];
            let category_list = await getData("category_names");
           
            let temp = document.createElement("div");

            for (let i = 1; i <= category_list.length; i++) {
                url = `http://localhost:1337/api/articles?populate=category&populate=icon&filters[category][filters[id][$eq]]=${i}&pagination[pageSize]=1`;
                let response = await fetch(url);
                let result = await response.json();

                //strip content for the card
                temp.innerHTML = result["data"][0]["attributes"]["content"];
                let element = temp.querySelector("p");                

                cards.push({
                    icon_url: "http://localhost:1337" + result["data"][0]["attributes"]["icon"]["data"][0]["attributes"]["formats"]["small"]["url"],
                    content: (<p>{element.innerHTML}</p>),
                    name: result["data"][0]["attributes"]["category"]["data"]["attributes"]["name"],
                    article_id: result["data"][0]["id"]
                });
            }

            return cards;

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
            let footer_ids = [];

            let tempDiv = document.createElement("div");
            
            for (let i = 0; i < result["data"].length; i++) {
                
                tempDiv.innerHTML = result["data"][i]["attributes"]["content"];
                
                let ele = tempDiv.querySelector("p");
                
                let target = ele.innerHTML;
                
                footer_list.push(
                    target
                );

                footer_ids.push(
                    result["data"][i]["id"]
                );
            }

            return {
                category_name: result["data"][0]["attributes"]["category"]["data"]["attributes"]["name"],
                footer_list_content: footer_list,
                footer_list_IDs: footer_ids
            };

    }

    return null;

}

export default getData;
