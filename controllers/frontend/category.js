// controllers/frontend/category.js

const postdb = require("../../models/post")


class Category{
    async getPosts(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Category page"
        setup.route = "/category"
        setup.type = req.params.category

        const { posts, length } = await postdb.getPosts(req, setup.categoryItemLimit)
        setup.items = posts
        setup.count = length
        setup.page = 1
        
        res.render("base", { data: setup })
    }

    async paginate(req, res){
        const setup = await req.mysetup()
        const { posts, length } = await postdb.paginate(req, setup.categoryItemLimit)
        setup.count = length
        setup.items = posts
        setup.page = parseInt(req.body.page) + 1
        res.json(setup)
    }
}


module.exports = new Category()