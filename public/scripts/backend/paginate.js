//public/scripts/backend/paginate.js

let page = 0

function paginate(route){
    $('.pagination img').attr('src', '/images/loading.gif')
    page += 1
    
    $.post(`${route}/paginate`,{page:page},function(data, status){
        appendItem(data.items, route, data)
    })
}

function appendItem(items, route, data){
    let html = ''
    
    if(items){
        for(let item of items){
            html += `<li>`
            html += `<a class="thumb" href="/${data.type}/${item.key}">`
            html += `<img src="${item.thumb}" />`
            if(item.videos){
                if((item.videos !== "")&&(item.videos !== "[]")){
                    html+= `<img class="play-icon" src="/images/play.png" />`
                }
            }
            html += `</a>`
            html += `<div class="container">`
            html += `<div class="title">`
            html += `<a href="/${data.type}/${item.key}">`
            html += `${item.title}`
            html += `</a>`
            html += `</div>`
            html += `<div class="date">`
            html += `${(new Date(item.date)).toLocaleDateString("it-IT")}`
            html += `</div>`
            html += `</div>`
            html += `<div class="edit">`
            html += `<a href="/admin/${data.type}/edit/${item.key}">`
            html += `<img src="/images/edit.png" />`
            html += `</a>`
            html += `<a href="/admin/${data.type}/delete/${item.key}">`
            html += `<img src="/images/delete.png" />`
            html += `</a>`
            html += `</div>`
            html += `</li>`
        }
    }
    $('.footer ul').append(html)

    if(route === '/admin/user'){
        $('.footer ul li').css({'grid-template-columns':'13% auto 25%'})
        $('.footer ul li .thumb').css({'padding-top':'100%'})
        $('.footer ul li .thumb img').css({'border-radius':'50%'})
    }

    $('.pagination img').attr('src', '/images/loadmore.png')
}