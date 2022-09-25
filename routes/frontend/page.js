// routes/frontend/page.js

const express = require("express")
const router = express.Router()

const page = require("../../controllers/frontend/page")


router.get("/:key", async (req, res) => {
    page.getPage(req, res)
})


module.exports = router