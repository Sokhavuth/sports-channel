// routes/backend/post.js

const express = require("express")
const router = express.Router()

const post = require("../../controllers/backend/post")

router.get("/", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user){
        post.getPage(req, res)
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
        post.createPost(req, res)
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
        post.editPost(req, res)
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
        post.updatePost(req, res)
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
    
    if(user && (user.role in {"Admin":1, "Author":1})){
        req.myuser = user 
        post.deletePost(req, res)
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
        post.paginate(req, res)
    }else{
        res.redirect("/admin")
    }
})


module.exports = router