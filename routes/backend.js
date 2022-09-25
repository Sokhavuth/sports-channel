// routes/backend.js

const express = require("express")
const router = express.Router()

const adminRouter = require("./backend/admin")
router.use("/", adminRouter)

const postRouter = require("./backend/post")
router.use("/post", postRouter)

const pageRouter = require("./backend/page")
router.use("/page", pageRouter)

const bookRouter = require("./backend/book")
router.use("/book", bookRouter)

const categoryRouter = require("./backend/category")
router.use("/category", categoryRouter)

const uploadRouter = require("./backend/upload")
router.use("/upload", uploadRouter)

const userRouter = require("./backend/user")
router.use("/user", userRouter)

const settingRouter = require("./backend/setting")
router.use("/setting", settingRouter)

const searchRouter = require("./backend/search")
router.use("/search", searchRouter)


module.exports = router