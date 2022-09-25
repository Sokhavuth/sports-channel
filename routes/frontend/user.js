// routes/frontend/user.js

const express = require("express")
const router = express.Router()

const user = require("../../controllers/frontend/user")


router.get("/:key", async (req, res) => {
    user.getUser(req, res)
})


module.exports = router