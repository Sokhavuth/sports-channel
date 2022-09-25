// routes/backend/category.js

const express = require("express")
const router = express.Router()

const category = require("../../controllers/backend/category")


router.get("/", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user){
        req.myusername = user.title
        category.getPage(req, res)
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
    
    if(user && (user.role === "Admin")){
        req.myusername = user.title
        category.createCategory(req, res)
    }else{
        res.redirect("/admin")
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
        category.editCategory(req, res)
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
    
    if(user && (user.role === "Admin")){
        category.updateCategory(req, res)
    }else{
        res.redirect("/admin")
    }
})

router.get("/delete/:key", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user && (user.role === "Admin")){
        category.deleteCategory(req, res)
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
        category.paginate(req, res)
    }else{
        res.redirect("/admin")
    }
})


module.exports = router