// routes/frontend/home.js

const express = require("express")
const router = express.Router()

const home = require("../../controllers/frontend/home")

router.get("/", async (req, res) => {
    home.getPage(req, res)
})

router.post("/paginate", async (req, res) => {
    home.paginate(req, res)
})


module.exports = router