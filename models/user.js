// models/user.js
// npm install bcryptjs

const bcrypt = require("bcryptjs")


class User{
    async getAllItems(req){
        let result = await req.mydb.users.fetch()
        let allItems = result.items

        while(result.last){
            result = await req.mydb.users.fetch({}, {last: result.last})
            allItems = allItems.concat(result.items)
        }
        
        return allItems
    }

    async createRootUser(req){
        const hashPassword = bcrypt.hashSync("xxxxxxxxxxxxxxx", 8)

        const user = {
            title: "Guest",
            password: hashPassword,
            email: "guest@khmerweb.app",
            role: "Guest",
            thumb: "",
            info: "",
            video: "",
            date: ""
        }

        await req.mydb.users.put(user)
    }

    async checkUser(req){
        return await req.mydb.users.fetch({ email: req.body.email })
    }

    async createUser(req){
        const hashedPassword = bcrypt.hashSync(req.body.password, 8)

        const user = {
            title: req.body.title,
            password: hashedPassword,
            email: req.body.email,
            role: req.body.role,
            thumb: req.body.thumb,
            content: req.body.content,
            date: req.body.datetime,
        }

        await req.mydb.users.put(user)
    }

    async getUsers(req, amount){
        const allItems = await this.getAllItems(req)
        allItems.sort((a, b) => {     
            let da = new Date(a.date)
            let db = new Date(b.date)
            return db - da
        })

        const users = allItems.slice(0, amount)
        const length = allItems.length
        return { users, length }
    }

    async getUser(req){
        return await req.mydb.users.get(req.params.key)
    }

    async updateUser(req){
        if(req.body.password !== req.myuser.password){
            var hashedPassword = bcrypt.hashSync(req.body.password, 8)
        }else{
            var hashedPassword = req.body.password
        }
        
        const user = {
            title: req.body.title,
            password: hashedPassword,
            email: req.body.email,
            role: req.body.role,
            thumb: req.body.thumb,
            content: req.body.content,
            date: req.body.datetime,
        }
     
        await req.mydb.users.update(user, req.params.key)
    }

    async deleteUser(req){
        await req.mydb.users.delete(req.params.key)
    }

    async paginate(req, amount){
        const allItems = await this.getAllItems(req)
        allItems.sort((a, b) => {     
            let da = new Date(a.date)
            let db = new Date(b.date)
            return db - da
        })
        const page = parseInt(req.body.page)
        const users = allItems.slice(page*amount, (page + 1)*amount)
        const length = allItems.length
        return { users, length }
    }
}


module.exports = new User()