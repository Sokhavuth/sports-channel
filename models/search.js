// models/search.js

const postdb = require("./post")
const categorydb = require("./category")
const userdb = require("./user")


class Search{
    async searchItems(req, amount){
        const q = req.body.q
        const type = req.body.search_type

        const query = [
            {"title?contains": q},
            {"content?contains": q},
            {"categories?contains": q},
            {"role?contains": q}
        ]

        const { items } = await req.mydb[type].fetch(query)
        items.sort((a, b) => {     
            let da = new Date(a.date)
            let db = new Date(b.date)
            return db - da
        })
    
        return items.slice(0, amount)
    }
}


module.exports = new Search()