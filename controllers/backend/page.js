// controllers/backend/page.js

const pagedb = require("../../models/page")


class Page{
    async getPage(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Static page"
        setup.route = "/admin/page"
        setup.type = "page"
        setup.username = req.myusername

        const { pages, length } = await pagedb.getPages(req, setup.dpostLimit)
        setup.items = pages
        setup.count = length

        res.render("base", { data: setup })
    }

    async createPage(req, res){
        pagedb.createPage(req)
        res.redirect("/admin/page")
    }

    async editPage(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Edit static page"
        setup.route = "/admin/page"
        setup.type = "page"
        setup.username = req.myusername

        const { pages, length} = await pagedb.getPages(req, setup.dpostLimit)
        setup.items = pages
        setup.count = length
        setup.item = await pagedb.getPage(req)

        res.render("base", { data: setup })
    }

    async updatePage(req, res){
        await pagedb.updatePage(req)
        res.redirect("/admin/page")
    }

    async deletePage(req, res){
        await pagedb.deletePage(req)
        res.redirect("/admin/page")
    }

    async paginate(req, res){
        const setup = await req.mysetup()
        const { pages, length } = await pagedb.paginate(req, setup.dpostLimit)
        setup.items = pages
        setup.count = length
        setup.type = "page"
        res.json(setup)
    }
}


module.exports = new Page()