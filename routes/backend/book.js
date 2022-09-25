// routes/backend/book.js

const express = require("express")
const router = express.Router()

const book = require("../../controllers/backend/book")


router.get("/", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user){
        req.myusername = user.title
        book.getPage(req, res)
    }else{
        res.redirect("/admin")
    }
})

router.post("/", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user && (user.role in {"Admin":1, "Editor":1, "Author":1})){
        req.myuserid = user.key
        book.createBook(req, res)
    }else{
        res.redirect("/admin/book")
    }
})

router.get("/edit/:key", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user){
        req.myusername = user.title
        book.editBook(req, res)
    }else{
        res.redirect("/admin")
    }
})

router.post("/edit/:key", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user && (user.role in {"Admin":1, "Editor":1, "Author":1})){
        req.myuser = user 
        book.updateBook(req, res)
    }else{
        res.redirect("/admin/book")
    }
})

router.get("/delete/:key", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user && (user.role in {"Admin":1, "Author":1})){
        req.myuser = user 
        book.deleteBook(req, res)
    }else{
        res.redirect("/admin")
    }
})

router.post("/paginate", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user){
        book.paginate(req, res)
    }else{
        res.redirect("/admin")
    }
})


module.exports = router