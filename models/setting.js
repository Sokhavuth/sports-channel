// models/setting.js

class Setting{
    async createSetting(req){
        const setting = {
            siteTitle: req.body.siteTitle,
            description: req.body.description,
            ditemLimit: req.body.ditemLimit,
            fitemLimit: req.body.fitemLimit,
            categoryItemLimit: req.body.categoryItemLimit,
        }
        await req.mydb.setting.put(setting)
    }

    async getSetting(req){
        return await req.mydb.setting.get("l8gyngm9")
    }

    async updateSetting(req){
        const setting = {
            siteTitle: req.body.siteTitle,
            description: req.body.description,
            ditemLimit: req.body.ditemLimit,
            fitemLimit: req.body.fitemLimit,
            categoryItemLimit: req.body.categoryItemLimit,
        }

        await req.mydb.setting.update(setting, req.params.key)
    }
}


module.exports = new Setting()