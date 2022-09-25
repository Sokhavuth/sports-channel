// controllers/backend/setting.js

const settingdb = require("../../models/setting")


class Setting{
    async getPage(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Settings page"
        setup.route = "/admin/setting"
        setup.username = req.myusername
        setup.item = await settingdb.getSetting(req)

        res.render("base", { data: setup })
    }

    async createSetting(req, res){
        await settingdb.createSetting(req)
        res.redirect("/admin/post")
    }

    async updateSetting(req, res){
        await settingdb.updateSetting(req)
        res.redirect("/admin/post")
    }
}


module.exports = new Setting()