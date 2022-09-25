// routes/frontend/search.js

const express = require("express")
const router = express.Router()

const search = require("../../controllers/frontend/search")


router.post("/", async (req, res) => {
    search.searchItems(req, res)
})


module.exports = router