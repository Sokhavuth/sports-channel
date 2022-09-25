// routes/backend/search.js

const express = require("express")
const router = express.Router()

const search = require("../../controllers/backend/search")


router.post("/", async (req, res) => {
    const { sessionid } = req.signedCookies
    let user = false
    if(sessionid){
        user = await req.mydb.session.get(sessionid)
    }
    
    if(user){
        req.myusername = user.title
        search.searchItems(req, res)
    }else{
        res.redirect("/admin")
    }
})


module.exports = router