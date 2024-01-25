async function getData(request_type) {

    let categories = [];

    let url = ``;
    let response;

    switch(request_type) {
        case "category_names":
            url = `http://localhost:1337/api/categories`;
            response = await fetch(url);
    
            let result = await response.json();
    
            let entries = result["data"];
    
            for (let i = 0; i < entries.length; i++) {
                categories.push({
                    name: entries[i]["attributes"]["name"],
                    category_id: entries[i]["id"]
                });
            }
    
            return categories;

    }

    return null;

}

export default getData;
