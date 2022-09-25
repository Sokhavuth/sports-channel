//public/scripts/paginate.js

let page = 0

function paginate(label){
    $('.pagination img').attr('src', '/images/loading.gif')
    page += 1
    
    $.post(`/category/${label}`,{page:page},function(data, status){
        appendItem(data.items, data)
    })
}

function appendItem(items, data){
    let html = ''
    
    if(items){
        for(const post of items){
            html += `<div class="thumb">`
            html += `<a class="wrapper" href="/post/${post.key}">`
                html += `<img src="${post.thumb}" />`
                    if(post.videos){
                        if((post.videos !== "")&&(post.videos !== "[]")){
                        html += `<img class="play-icon" src="/images/play.png" />`
                    }
                }
            html += `</a>`
            html += `<p class="date">${(new Date(post.date)).toLocaleDateString("it-IT")}</p>`
            html += `<p class="title"><a href="/post/${post.key}">${post.title}</a></p>`
            html += `</div>`
        }
    }
    
    let message = ''
    if(data.count - data.page*data.categoryItemLimit === 1){
        message = `1 more post`
    }else if(data.count - data.page*data.categoryItemLimit <= 0){
        message = `no more post`
    }else{
        message = `${data.count - data.page*data.categoryItemLimit} more posts`
    }

    $('.Category .inner').append(html)
    $('.Category .pagination p').html(message)
    
    $('.pagination img').attr('src', '/images/loadmore.png')
}