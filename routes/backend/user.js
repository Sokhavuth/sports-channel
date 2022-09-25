// routes/backend/user.js

const express = require("express")
const router = express.Router()

const _user = require("../../controllers/backend/user")

router.get("/", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user){
        req.myusername = user.title
        _user.getPage(req, res)
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
        _user.createUser(req, res)
    }else{
        res.redirect("/admin/user")
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
        _user.editUser(req, res)
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
    
    if(user){
        req.myuser = user
        _user.updateUser(req, res)
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
        req.myuser = user
        _user.deleteUser(req, res)
    }else{
        res.redirect("/admin/user")
    }
})

router.post("/paginate", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user){
        _user.paginate(req, res)
    }else{
        res.redirect("/admin")
    }
})


module.exports = router