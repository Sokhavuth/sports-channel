// controllers/frontend/page.js

const pagedb = require("../../models/page")


class Page{
    async getPage(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Static page"
        setup.route = `/page/${req.params.key}`

        setup.item = await pagedb.getPage(req)

        res.render("base", { data: setup })
    }
}


module.exports = new Page()