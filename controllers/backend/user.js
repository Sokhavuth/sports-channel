// controllers/backend/user.js
//
const userdb = require("../../models/user")


class User{
    async getPage(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Users page"
        setup.route = "/admin/user"
        setup.type = "user"
        setup.username = req.myusername
        if(req.mymessage){
            setup.message = req.mymessage
        }

        const { users, length } = await userdb.getUsers(req, setup.dpostLimit)
        setup.items = users
        setup.count = length
        res.render("base", { data: setup })
    }

    async createUser(req, res){
        const user = await userdb.checkUser(req)
        if(user.count){
            req.mymessage = `This email ${req.body.email} is already used by another user.`
            this.getPage(req, res)
        }else{
            userdb.createUser(req)
            res.redirect("/admin/user")
        }
    }

    async editUser(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Edit user"
        setup.route = "/admin/user"
        setup.type = "user"
        setup.username = req.myusername

        const { users, length} = await userdb.getUsers(req, setup.dpostLimit)
        setup.items = users
        setup.count = length
        setup.item = await userdb.getUser(req)

        res.render("base", { data: setup })
    }

    async updateUser(req, res){
        const user = await userdb.getUser(req)
        if((req.myuser.role === "Admin") || (req.myuser.key === user.key)){
            await userdb.updateUser(req)
        }
        
        res.redirect("/admin/user")
    }

    async deleteUser(req, res){
        await userdb.deleteUser(req)
        res.redirect("/admin/user")
    }

    async paginate(req, res){
        const setup = await req.mysetup()
        const { users, length } = await userdb.paginate(req, setup.dpostLimit)
        setup.items = users
        setup.count = length
        setup.type = "user"
        res.json(setup)
    }
}


module.exports = new User()