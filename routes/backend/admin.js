// routes/backend/admin.js

const express = require("express")
const router = express.Router()

const admin = require("../../controllers/backend/admin")


router.get("/", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user){
        res.redirect("/admin/post")
    }else{
        admin.getLogin(req, res)
    }
})

router.post("/", async (req, res) => {
    admin.auth(req, res)
})

router.get("/logout", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user){
        await req.mydb.session.delete(sessionid)
        res.clearCookie("sessionid")
        res.redirect('/admin')
    }else{
        res.redirect("/admin")
    }
})


module.exports = router