// controllers/backend/category.js

const categorydb = require("../../models/category")


class Category{
    async getPage(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Category page"
        setup.route = "/admin/category"
        setup.type = "category"
        setup.username = req.myusername

        const { categories, length} = await categorydb.getCategories(req, setup.dpostLimit)
        setup.items = categories
        setup.count = length

        res.render("base", { data: setup })
    }

    async createCategory(req, res){
        categorydb.createCategory(req)
        res.redirect("/admin/category")
    }

    async editCategory(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Edit category page"
        setup.route = "/admin/category"
        setup.type = "category"
        setup.username = req.myusername

        const { categories, length} = await categorydb.getCategories(req, setup.dpostLimit)
        setup.items = categories
        setup.count = length
        setup.item = await categorydb.getCategory(req)

        res.render("base", { data: setup })
    }

    async updateCategory(req, res){
        categorydb.updateCategory(req)
        res.redirect("/admin/category")
    }

    async deleteCategory(req, res){
        categorydb.deleteCategory(req)
        res.redirect("/admin/category")
    }

    async paginate(req, res){
        const setup = await req.mysetup()
        const { categories, length } = await categorydb.paginate(req, setup.dpostLimit)
        setup.items = categories
        setup.count = length
        setup.type = "category"
        res.json(setup)
    }
}


module.exports = new Category()