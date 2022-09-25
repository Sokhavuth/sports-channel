// static/scripts/navigate.js

class Navigate{
    constructor(){
        this.page = 0
        this.apage = 0
    }

    async getItems(page, ele){
        $(`${ele} .home`).attr('src','/images/loading.gif')

        let body = {}

        if(ele === ".top-nav"){
            if(page !== 0){
                this.page += page
                
                if(this.page < 0){
                    this.page = 0
                }
            }else{
                this.page = page
            }
    
            body = {
                page: this.page,
            }
            var element = "top_nav"
        }else{
            
            if(page !== 0){
                this.apage += page
                if(this.apage < 0){
                    this.apage = 0
                }
            }else{
                this.apage = page
            }
    
            body = {
                page: this.apage,
            }
            var element = "article_nav"
        }

        this.ele = ele
        
        $.post(`/navigate/${element}`,body,function(data, status){
            if(data.items.length === 0){
                if(ele === ".top-nav"){
                    navigate.page -= 1
                }else{
                    navigate.apage -= 1
                }
                
                $(`${ele} .home`).attr('src','/images/home.png')
            }else{
                navigate.generateHmtl(data.items, ele)
            }
        })
    }

    async generateHmtl(items, ele){
        let html = ''

        for(let item of items){
            if(ele === ".top-nav"){
                html += `<a href="/book/${item.key}">`
                html += `<img src="${item.bookCover}" />`
                html += `</a>`
            }else{
                html += `<a class="thumb" href="/book/${item.key}">`
                html += `<img src="${item.thumb}" />`
                if(item.videos){
                    if((item.videos !== "")&&(item.videos !== "[]")){
                        html += `<img class="play-icon" src="/images/play.png" />`
                    }
                }
                html += `</a>`
            }
        }

        if(ele == ".top-nav"){
            $('.feature-post').html(html)
        }else{
            $('.Article').html(html)
        }

        $(`${ele} .home`).attr('src','/images/home.png')
    }
}

const navigate = new Navigate()