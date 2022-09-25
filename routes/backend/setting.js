// routes/backend/setting.js

const express = require("express")
const router = express.Router()

const setting = require("../../controllers/backend/setting")


router.get("/", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user){
        req.myusername = user.title
        setting.getPage(req, res)
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
        setting.createSetting(req, res)
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
        setting.updateSetting(req, res)
    }else{
        res.redirect("/admin")
    }
})


module.exports = router