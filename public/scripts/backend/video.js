// static/scripts/video.js

let episode = 0

const genJson = () => {
    let json = $('input[name="videos"]').val()
    if((json !== '')&&(json !== '[]')){
        json = JSON.parse(json)
        episode = json.length
    }else{
        episode = 0
    }

    const type = $('select[name="type"').val()
    const id = $('input[name="videoid"').val()
    const status = $('select[name="status"').val()
            
    let video = {
        type: type,
        id: id,
        status: status,
    }
        
    let success = false
    
    for(let v in video){
        if(video[v] === ''){
            alert('You need to fill the required field '+v)
            success = false
            break
        }else{
            success = true
        }
    }

    if(success){
        let json = $('input[name="videos"]').val()
        video = {
            type: type,
            id: id,
            status: status,
        }
        if((json === '')){
            json = JSON.stringify([video])
            $('input[name="videos"]').val(json)
        }else{
            json = JSON.parse(json)
            json.push(video)
            json = JSON.stringify(json)
            $('input[name="videos"').val(json)
        }

        let html =``

        for(let v in video){
            html += `<input value="${video[v]}" required />`
        }

        html += `<p title="Delete" onClick="deleteRow(event)" class="episode">${++episode}</p>`
        html = `<div>${html}</div>`
        
        if($('.viddata div').html() === ''){
            $('.viddata div').append('<b>Video type​</b>')
            $('.viddata div').append('<b>Video id​</b>')
            $('.viddata div').append('<b>Status</b>')
            $('.viddata div').append('<b>Part/Delete</b>')
        }
        
        $('.viddata div:eq(0)' ).after(html)
    }
}

function submitForm(e){
    e.preventDefault()
    
    const is_video = $('input[name="videos"').val()

    if((is_video !== '') && (is_video !== '[]')){
        episode = JSON.parse(is_video).length
        let videos = []
        let part = {}
        let key = {0:'type', 1:'id', 2:'status'}

        for(let v=1; v<=episode; v++){
            for(let j=0; j<3; j++){
                part[key[j]] = $(`.viddata div:eq(${v}) input:eq(${j})`).val()
            }

            videos.push({...part})
        }
    
        const json = JSON.stringify(videos)
        $('input[name="videos"').val(json)
    }
    
    document.forms["form"].submit()
}

function deleteRow(e) {
    e.target.parentElement.remove()
    
    let index = parseInt(e.target.innerHTML)
    index = index - 1
    let json = $('input[name="videos"]').val()
    json = JSON.parse(json)
    json.splice(index, 1)
    episode = json.length
    json = JSON.stringify(json)
    $('input[name="videos"').val(json)

    for(let v=episode; v>-1; v--){
        $('.episode').eq(v).html(episode-v)
    }
}