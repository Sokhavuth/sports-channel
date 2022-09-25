// controllers/frontend

const userdb = require("../../models/user")
const bcrypt = require("bcryptjs")


class Admin{
    async getLogin(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Login Page"
        setup.route = "/admin"

        res.render("base", { data: setup })
    }

    async auth(req, res){
        const setup = await req.mysetup()
        const users = await userdb.checkUser(req)
        
        if(users.count){
            
            const user = users.items[0]
            if(bcrypt.compareSync(req.body.password, user.password)){
                await req.mydb.session.put(user, user.key, { expireIn: 60*60*24*15 })
                res.cookie('sessionid', user.key, {signed: true})
                res.redirect('/admin/post')
            }else{
                setup.message = 'The password is wrong!'
                setup.route = '/admin'
                res.render('base',{ data: setup })
            }
        }else{
            setup.message = 'The email is wrong!'
            setup.route = '/admin'
            res.render('base',{ data: setup })
        }
    }
}


module.exports = new Admin()