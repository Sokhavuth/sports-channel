// controllers/backend/post.js

const postdb = require("../../models/post")
const categorydb = require("../../models/category")


class Post{
    async getPage(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Post page"
        setup.route = "/admin/post"
        setup.type = "post"

        const { sessionid } = req.signedCookies
        let user = false
        if(sessionid){
            user = await req.mydb.session.get(sessionid)
        }
        if(user){
            setup.username = user.title
        }

        const { posts, length} = await postdb.getPosts(req, setup.dpostLimit)
        setup.items = posts
        setup.count = length
        setup.categories = await categorydb.getAllItems(req)

        res.render("base", { data: setup })
    }

    async createPost(req, res){
        postdb.createPost(req)
        res.redirect("/admin/post")
    }

    async editPost(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Edit post page"
        setup.route = "/admin/post"
        setup.type = "post"
        setup.username = req.myusername

        const { posts, length} = await postdb.getPosts(req, setup.dpostLimit)
        setup.items = posts
        setup.count = length
        setup.item = await postdb.getPost(req)
        setup.categories = await categorydb.getAllItems(req)

        res.render("base", { data: setup })
    }

    async updatePost(req, res){
        if(req.myuser.role === "Author"){
            const post = await postdb.getPost(req)
            if(req.myuser.key === post.userid){
                await postdb.updatePost(req)
            }
        }else{
            await postdb.updatePost(req)
        }

        res.redirect("/admin/post")
    }

    async deletePost(req, res){
        if(req.myuser.role === "Author"){
            const post = await postdb.getPost(req)
            if(req.myuser.id === post.userid){
                await postdb.deletePost(req)
            }
        }else{
            await postdb.deletePost(req)
        }

        res.redirect("/admin/post")
    }

    async paginate(req, res){
        const setup = await req.mysetup()
        const { posts, length } = await postdb.paginate(req, setup.dpostLimit)
        setup.items = posts
        setup.count = length
        setup.type = "post"
        res.json(setup)
    }
}


module.exports = new Post()