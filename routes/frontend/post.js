// routes/frontend/post.js

const express = require("express")
const router = express.Router()

const post = require("../../controllers/frontend/post")


router.get("/:key", async (req, res) => {
    post.getPost(req, res)
})


module.exports = router