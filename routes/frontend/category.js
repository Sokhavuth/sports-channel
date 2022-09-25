// routes/frontend/category.js

const express = require("express")
const router = express.Router()

const category = require("../../controllers/frontend/category")


router.get("/:category", async (req, res) => {
    category.getPosts(req, res)
})

router.post("/:category", async (req, res) => {
    category.paginate(req, res)
})


module.exports = router