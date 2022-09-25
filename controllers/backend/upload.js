// controllers/backend/upload.js

const postdb = require("../../models/post")
const crypto = require('crypto')


class Upload{
    async getPage(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Upload page"
        setup.route = "/admin/upload"
        setup.username = req.myusername
        
        res.render("base", {data: setup})
    }

    async insertFile(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Upload page"
        setup.route = "/admin/upload"
        setup.username = req.myusername
        
        setup.name = crypto.randomUUID() + "-" + req.files.file.name
        const contents = req.files.file.data
        setup.img = await req.mydb.upload.put(setup.name, {data: contents})
        res.render("base", {data: setup})
    }

    async getFile(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Upload/page"
        setup.route = "/admin/upload"

        const name = req.params.fileName
        const img = await req.mydb.upload.get(name)
        const buffer = await img.arrayBuffer()
        res.send(Buffer.from(buffer))
    }
}


module.exports = new Upload()