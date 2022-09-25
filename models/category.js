// models/category.js

class Category{
    async getAllItems(req){
        let result = await req.mydb.categories.fetch()
        let allItems = result.items

        while(result.last){
            result = await req.mydb.categories.fetch({}, {last: result.last})
            allItems = allItems.concat(result.items)
        }
        
        return allItems
    }

    async getCategories(req, amount){
        const allItems = await this.getAllItems(req)
        allItems.sort((a, b) => {     
            let da = new Date(a.date)
            let db = new Date(b.date)
            return db - da
        })

        const categories = allItems.slice(0, amount)
        const length = allItems.length
        return { categories, length }
    }

    async getCategory(req){
        return await req.mydb.categories.get(req.params.key)
    }

    async createCategory(req){
        const new_category = {
            title: req.body.title,
            thumb: req.body.thumb,
            date: req.body.datetime,
        }

        await req.mydb.categories.put(new_category)
    }

    async updateCategory(req){
        const updatedCategory = {
            title: req.body.title,
            thumb: req.body.thumb,
            date: req.body.datetime,
        }

        await req.mydb.categories.update(updatedCategory, req.params.key)
    }

    async deleteCategory(req){
        await req.mydb.categories.delete(req.params.key)
    }

    async paginate(req, amount){
        const allItems = await this.getAllItems(req)
        allItems.sort((a, b) => {     
            let da = new Date(a.date)
            let db = new Date(b.date)
            return db - da
        })
        const page = parseInt(req.body.page)
        const categories = allItems.slice(page*amount, (page + 1)*amount)
        const length = allItems.length
        return { categories, length }
    }

}


module.exports = new Category()