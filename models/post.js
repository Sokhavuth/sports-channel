// models/post.js


class Post{
    async getAllItems(req, query={}){
        const category = req.params.category
        if(category){
            query = {"categories?contains": category}
        }

        let result = await req.mydb.posts.fetch(query)
        let allItems = result.items

        while(result.last){
            result = await req.mydb.posts.fetch(query, {last: result.last})
            allItems = allItems.concat(result.items)
        }
        
        return allItems
    }

    async createPost(req){
        let categories = []

        if(req.body.categories.includes(',')){
            categories = req.body.categories.split(',')
        }else{
            categories = [req.body.categories]
        }
        
        const new_post = {
            title: req.body.title,
            content: req.body.content,
            categories: categories,
            thumb: req.body.thumb,
            date: req.body.datetime,
            videos: req.body.videos,
            userid: req.myuserid,
        }

        await req.mydb.posts.put(new_post)
    }

    async getPosts(req, amount, query={}){
        const allItems = await this.getAllItems(req, query)
        allItems.sort((a, b) => {     
            let da = new Date(a.date)
            let db = new Date(b.date)
            return db - da
        })
        
        const posts = allItems.slice(0, amount)
        const length = allItems.length
        return { posts, length }
    }

    async getPost(req){
        return await req.mydb.posts.get(req.params.key)
    }

    async paginate(req, amount){
        const allItems = await this.getAllItems(req)
        allItems.sort((a, b) => {     
            let da = new Date(a.date)
            let db = new Date(b.date)
            return db - da
        })
        const page = parseInt(req.body.page)
        const posts = allItems.slice(page*amount, (page + 1)*amount)
        const length = allItems.length
        return { posts, length }
    }

    async updatePost(req){
        let categories = []

        if(req.body.categories.includes(',')){
            categories = req.body.categories.split(',')
        }else{
            categories = [req.body.categories]
        }

        const updatedPost = {
            title: req.body.title,
            content: req.body.content,
            categories: categories,
            thumb: req.body.thumb,
            date: req.body.datetime,
            videos: req.body.videos,
        }

        await req.mydb.posts.update(updatedPost, req.params.key)
    }

    async deletePost(req){
        await req.mydb.posts.delete(req.params.key)
    }

    async paginate(req, amount){
        const allItems = await this.getAllItems(req)
        allItems.sort((a, b) => {     
            let da = new Date(a.date)
            let db = new Date(b.date)
            return db - da
        })
        const page = parseInt(req.body.page)
        const posts = allItems.slice(page*amount, (page + 1)*amount)
        const length = allItems.length
        return { posts, length }
    }
}


module.exports = new Post()