// models/book.js

class Book{
    async getAllItems(req, query={}){
        const category = req.params.category
        if(category){
            var query = {"bookCover?ne": null, "bookCover?ne": "", "categories?contains": category}
        }

        let result = await req.mydb.books.fetch(query)
        let allItems = result.items

        while(result.last){
            result = await req.mydb.books.fetch(query, {last: result.last})
            allItems = allItems.concat(result.items)
        }
        
        return allItems
    }

    async createBook(req){
        let categories = []

        if(req.body.categories.includes(',')){
            categories = req.body.categories.split(',')
        }else{
            categories = [req.body.categories]
        }
        
        const new_book = {
            title: req.body.title,
            content: req.body.content,
            categories: categories,
            thumb: req.body.thumb,
            date: req.body.datetime,
            bookTitle: req.body.bookTitle,
            bookCover: req.body.bookCover,
            chapter: req.body.chapter,
            videos: req.body.videos,
            userid: req.myuserid,
        }

        await req.mydb.books.put(new_book)
    }

    async getBooks(req, amount, query={}){
        const allItems = await this.getAllItems(req, query)
        allItems.sort((a, b) => {     
            let da = new Date(a.date)
            let db = new Date(b.date)
            return db - da
        })

        if(amount){
            const books = allItems.slice(0, amount)
            const length = allItems.length
            return { books, length }
        }else{
            return allItems
        }
        
    }

    async getRandomBooks(req, amount, query){
        const allItems = await this.getAllItems(req, query)
        allItems.sort((a, b) => {     
            let da = new Date(a.date)
            let db = new Date(b.date)
            return db - da
        })

        const books = []
        const indexes = {}

        while(true){
            let index = Math.floor(Math.random() * allItems.length)
            if(!(index in indexes)){
                if(index > 4){
                    indexes[index] = true
                    books.push(allItems[index])
                }
            }
            
            if(books.length == amount){
                break
            }
        }

        return books
    }

    async getBook(req){
        return await req.mydb.books.get(req.params.key)
    }

    async updateBook(req){
        let categories = []

        if(req.body.categories.includes(',')){
            categories = req.body.categories.split(',')
        }else{
            categories = [req.body.categories]
        }

        const updated_book = {
            title: req.body.title,
            content: req.body.content,
            categories: categories,
            thumb: req.body.thumb,
            date: req.body.datetime,
            bookTitle: req.body.bookTitle,
            bookCover: req.body.bookCover,
            chapter: req.body.chapter,
            videos: req.body.videos,
        }

        await req.mydb.books.update(updated_book, req.params.key)
    }

    async deleteBook(req){
        await req.mydb.books.delete(req.params.key)
    }

    async paginate(req, amount){
        const allItems = await this.getAllItems(req)
        allItems.sort((a, b) => {     
            let da = new Date(a.date)
            let db = new Date(b.date)
            return db - da
        })
        const page = parseInt(req.body.page)
        const books = allItems.slice(page*amount, (page + 1)*amount)
        const length = allItems.length
        return { books, length }
    }

    async navigate(req, amount, query){
        const allItems = await this.getAllItems(req, query)
        allItems.sort((a, b) => {     
            let da = new Date(a.date)
            let db = new Date(b.date)
            return db - da
        })
        
        const page = parseInt(req.body.page)
        const books = allItems.slice(page*amount, (page + 1)*amount)
        const length = allItems.length
        return { books, length }
    }

    async getBook(req){
        return await req.mydb.books.get(req.params.key)
    }
}


module.exports = new Book()