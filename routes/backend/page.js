// routes/backend/page.js

const express = require("express")
const router = express.Router()

const page = require("../../controllers/backend/page")

router.get("/", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user){
        req.myusername = user.title
        page.getPage(req, res)
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
        page.createPage(req, res)
    }else{
        res.redirect("/admin/page")
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
        page.editPage(req, res)
    }else{
        res.redirect("/admin/page")
    }
})

router.post("/edit/:key", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user && (user.role === "Admin")){
        req.myusername = user.title
        page.updatePage(req, res)
    }else{
        res.redirect("/admin/page")
    }
})

router.get("/delete/:key", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user && (user.role in {"Admin":1})){
        req.myuser = user 
        page.deletePage(req, res)
    }else{
        res.redirect("/admin/page")
    }
})

router.post("/paginate", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user){
        page.paginate(req, res)
    }else{
        res.redirect("/admin")
    }
})


module.exports = router