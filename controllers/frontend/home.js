// controllers/frontend/home.js

const postdb = require("../../models/post")


class Home{
    async shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    async generateVideos(posts){
        const videos = []
        for(let post of posts){
            var playlist = post.videos
            await videos.push((JSON.parse(playlist))[0].id)
        }
        return videos
    }

    async getPage(req, res){
        const setup = await req.mysetup()
        setup.pageTitle = "Home"
        setup.route = "/"
        setup.type = "post"

        const amount = 50
        
        const query_football = { "categories?contains": "Football" }
        let footballObj = await postdb.getPosts(req, amount, query_football)
        this.shuffleArray(footballObj.posts)
        setup.footballThumb = footballObj.posts[0].thumb
        const footballVideos = await this.generateVideos(footballObj.posts)
        setup.football = JSON.stringify(footballVideos)

        const query_volleyball = { "categories?contains": "Volleyball" }
        let volleyballObj = await postdb.getPosts(req, amount, query_volleyball)
        this.shuffleArray(volleyballObj.posts)
        setup.volleyballThumb = volleyballObj.posts[0].thumb
        const volleyballVideos = await this.generateVideos(volleyballObj.posts)
        setup.volleyball = JSON.stringify(volleyballVideos)

        const query_basketball = { "categories?contains": "Basketball" }
        let basketballObj = await postdb.getPosts(req, amount, query_basketball)
        this.shuffleArray(basketballObj.posts)
        setup.basketballThumb = basketballObj.posts[0].thumb
        const basketballVideos = await this.generateVideos(basketballObj.posts)
        setup.basketball = JSON.stringify(basketballVideos)

        const query_boxing = { "categories?contains": "Boxing" }
        let boxingObj = await postdb.getPosts(req, amount, query_boxing)
        this.shuffleArray(boxingObj.posts)
        setup.boxingThumb = boxingObj.posts[0].thumb
        const boxingVideos = await this.generateVideos(boxingObj.posts)
        setup.boxing = JSON.stringify(boxingVideos)

        const query_talbe_tennis = { "categories?contains": "Table Tennis" }
        let table_tennisObj = await postdb.getPosts(req, amount, query_talbe_tennis)
        this.shuffleArray(table_tennisObj.posts)
        setup.tableTennisThumb = table_tennisObj.posts[0].thumb
        const tableTennisVideos = await this.generateVideos(table_tennisObj.posts)
        setup.tableTennis = JSON.stringify(tableTennisVideos)

        let { posts, length} = await postdb.getPosts(req, setup.fpostLimit)
        setup.latestPosts = posts
        setup.count = length
    
        setup.page = 1

        res.render("base", { data: setup })
    }

    async paginate(req, res){
        const setup = await req.mysetup()
        const { posts, length } = await postdb.paginate(req, setup.fpostLimit)
        setup.count = length
        setup.items = posts
        setup.page = parseInt(req.body.page) + 1
        
        res.json(setup)
    }

    async navigate(req, res){
        const setup = await req.mysetup()
        
        if(req.params.element == "top_nav"){
            var query = {"bookCover?ne": null, "bookCover?ne": ""}
            var { books, length } = await bookdb.navigate(req, 5, query)
            
        }else{
            var query = {}
            var { books, length } = await bookdb.navigate(req, 13, query)
        }
        
        setup.count = length
        setup.items = books
        res.json(setup)
    }

    async getRandomItems(req, res){
        const setup = await req.mysetup()

        const query = {"bookCover?ne": null, "bookCover?ne": ""}
        setup.randomBooks = await bookdb.getRandomBooks(req, setup.fpostLimit, query)
        res.json(setup)
    }
}


module.exports = new Home()