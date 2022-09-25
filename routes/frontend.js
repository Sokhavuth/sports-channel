// routes/frontend.js

const express = require("express")
const router = express.Router()

const homeRouter = require("./frontend/home")
router.use("/", homeRouter)

const postRouter = require("./frontend/post")
router.use("/post", postRouter)

const pageRouter = require("./frontend/page")
router.use("/page", pageRouter)

const userRouter = require("./frontend/user")
router.use("/user", userRouter)

const searchRouter = require("./frontend/search")
router.use("/search", searchRouter)

const categoryRouter = require("./frontend/category")
router.use("/category", categoryRouter)


module.exports = router