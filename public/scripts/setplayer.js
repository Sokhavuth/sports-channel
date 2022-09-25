//public/scripts/setPlayer.js

function setScreen(video,id,click){
    if(video['type'] == 'OK'){
        var url = `//ok.ru/videoembed/${video['id']}`
    }else if(video['type'] == 'YouTube'){
        var url = `https://www.youtube.com/embed/${video['id']}`
    }else if(video['type'] == 'YouTubePlaylist'){
        var url = `https://www.youtube.com/embed/videoseries?list=${video['id']}`
    }else if(video['type'] === "Facebook"){
        var url = `https://www.facebook.com/watch/?v=${video['id']}`
    }else if(video['type'] === "GoogleDrive"){
        var url = `https://docs.google.com/file/d/${video['id']}/preview`
    }else if(video['type'] === "Vimeo"){
        var url = `https://player.vimeo.com/video/${video['id']}`
    }else if(video['type'] === "Dailymotion"){
        var url = `https://www.dailymotion.com/embed/video/${video['id']}`
    }

    if(video['type'] !== 'Facebook'){
        var iframe = `<div>
        <iframe src="${url}" frameborder="0" allowfullscreen></iframe>
        </div>`;
      }else{
        var iframe = `<div class="fb-video" data-href="${url}" 
                     data-width="auto" data-show-captions="true"></div>`
    }

    if(click){
        $('.video .playlist #part'+clicked)
            .css({'background':'rgb(208, 215, 233)', 'color': 'black'})
    }
    $('.video .playlist #part'+id)
        .css({'background':'var(--link)', 'color': 'white'})


    $('.screen').html(iframe)
    
    if((video['type'] === "Facebook")&&(fb_api)){
        FB.XFBML.parse()
    }  

    clicked = id
}

