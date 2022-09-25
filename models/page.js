// models/page.js

class Page{
    async getAllItems(req){
        let result = await req.mydb.pages.fetch()
        let allItems = result.items

        while(result.last){
            result = await req.mydb.pages.fetch({}, {last: result.last})
            allItems = allItems.concat(result.items)
        }
        
        return allItems
    }

    async createPage(req){
        const new_page = {
            title: req.body.title,
            content: req.body.content,
            thumb: req.body.thumb,
            date: req.body.datetime,
        }

        await req.mydb.pages.put(new_page)
    }

    async getPages(req, amount){
        const allItems = await this.getAllItems(req)
        allItems.sort((a, b) => {     
            let da = new Date(a.date)
            let db = new Date(b.date)
            return db - da
        })

        const pages = allItems.slice(0, amount)
        const length = allItems.length
        return { pages, length }
    }

    async getPage(req){
        return await req.mydb.pages.get(req.params.key)
    }

    async updatePage(req){
        const updatedPage = {
            title: req.body.title,
            content: req.body.content,
            thumb: req.body.thumb,
            date: req.body.datetime,
        }

        await req.mydb.pages.update(updatedPage, req.params.key)
    }

    async deletePage(req){
        await req.mydb.pages.delete(req.params.key)
    }

    async paginate(req, amount){
        const allItems = await this.getAllItems(req)
        allItems.sort((a, b) => {     
            let da = new Date(a.date)
            let db = new Date(b.date)
            return db - da
        })
        const page = parseInt(req.body.page)
        const pages = allItems.slice(page*amount, (page + 1)*amount)
        const length = allItems.length
        return { pages, length }
    }
}


module.exports = new Page()