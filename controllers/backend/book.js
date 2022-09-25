// controllers/backend/post.js

const bookdb = require("../../models/book")
const categorydb = require("../../models/category")

class Book{
    async getPage(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Book page"
        setup.route = "/admin/book"
        setup.type = "book"
        setup.username = req.myusername

        setup.categories = await categorydb.getAllItems(req)
        const { books, length} = await bookdb.getBooks(req, setup.dpostLimit)
        setup.items = books
        setup.count = length

        res.render("base", { data: setup })
    }

    async createBook(req, res){
        await bookdb.createBook(req)
        res.redirect("/admin/book")
    }

    async editBook(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Edit book page"
        setup.route = "/admin/book"
        setup.type = "book"
        setup.username = req.myusername

        const { books, length} = await bookdb.getBooks(req, setup.dpostLimit)
        setup.items = books
        setup.count = length
        setup.item = await bookdb.getBook(req)
        setup.categories = await categorydb.getAllItems(req)

        res.render("base", { data: setup })
    }

    async updateBook(req, res){
        if(req.myuser.role === "Author"){
            const book = await bookdb.getBook(req)
            if(req.myuser.key === book.userid){
                await bookdb.updateBook(req)
            }
        }else{
            await bookdb.updateBook(req)
        }

        res.redirect("/admin/book")
    }

    async deleteBook(req, res){
        if(req.myuser.role === "Author"){
            const book = await bookdb.getBook(req)
            if(req.myuser.key === book.userid){
                await bookdb.deleteBook(req)
            }
        }else{
            await bookdb.deleteBook(req)
        }

        res.redirect("/admin/book")
    }

    async paginate(req, res){
        const setup = await req.mysetup()
        const { books, length } = await bookdb.paginate(req, setup.dpostLimit)
        setup.items = books
        setup.count = length
        setup.type = "book"
        res.json(setup)
    }
}


module.exports = new Book()