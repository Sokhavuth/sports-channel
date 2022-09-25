// config.js
// npm install deta

async function setup(){
    const setting = await db.setting.get("l8gyngm9")
    const settings = {
        siteTitle: setting.siteTitle,
        description: setting.description,
        date: (new Date()).toDateString(),
        dpostLimit: setting.ditemLimit,
        fpostLimit: setting.fitemLimit,
        categoryItemLimit: setting.categoryItemLimit,
        pageTitle: "Home",
        username: "",
        message: "",
        count: 0,
    }

    return settings
}

const { Deta } = require("deta")
const dotenv = require('dotenv')
dotenv.config()

const db = {}
const deta = Deta(process.env.PROJECT_KEY)
db.users = deta.Base("the_morning_news_users")
db.session = deta.Base("the_morning_news_session")
db.posts = deta.Base("sports")
db.pages = deta.Base("the_morning_news_pages")
db.books = deta.Base("the_morning_news_books")
db.categories = deta.Base("the_morning_news_categories")
db.setting = deta.Base("the_morning_news_setting")
db.upload = deta.Drive("upload")

module.exports = { setup, db }