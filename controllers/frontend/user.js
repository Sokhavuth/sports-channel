// controllers/frontend/user.js

const userdb = require("../../models/user")


class User{
    async getUser(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "User page"
        setup.route = "/user"

        setup.item = await userdb.getUser(req)

        res.render("base", { data: setup })
    }
}


module.exports = new User()