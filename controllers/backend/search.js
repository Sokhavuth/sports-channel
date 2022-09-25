// controllers/backend/search.js

const searchdb = require("../../models/search")


class Search{
    async searchItems(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Search page"
        setup.route = "/admin/search"
        setup.username = req.myusername

        const itemType = {
            "posts": "post",
            "categories": "category",
            "users": "user",
        }
        setup.type = itemType[req.body.admin_search_type]

        setup.searchResult = await searchdb.searchItems(req, 12)

        res.render("base", { data: setup })
    }
}


module.exports = new Search()