//asset/js/setPlayer.js

function setScreen(entry,id,click){
    if(entry['type'] == 'OK'){
        var url = `//ok.ru/videoembed/${entry['id']}`
    }else if(entry['type'] == 'YouTube'){
        var url = `https://www.youtube.com/embed/${entry['id']}`
    }else if(entry['type'] == 'YouTubePlaylist'){
        var url = `https://www.youtube.com/embed/videoseries?list=${entry['id']}`
    }else if(entry['type'] === "Facebook"){
        var url = `https://www.facebook.com/watch/?v=${entry['id']}`
    }else if(entry['type'] === "GoogleDrive"){
        var url = `https://docs.google.com/file/d/${entry['id']}/preview`
    }else if(entry['type'] === "Vimeo"){
        var url = `https://player.vimeo.com/video/${entry['id']}`
    }else if(entry['type'] === "Dailymotion"){
        var url = `https://www.dailymotion.com/embed/video/${entry['id']}`
    }

    if(entry['type'] !== 'Facebook'){
        var iframe = `<div>
        <iframe id="video-player" src="${url}" frameborder="0" allowfullscreen></iframe>
        </div>`;
      }else{
        var iframe = `<div class="fb-video" data-href="${url}" data-width="auto" data-show-captions="true"></div>`;
    }

    if(click){
        $('.Random-thumb .player .playlist #part'+clicked)
            .css({'background':'lightgrey','color':'rgb(87, 87, 87)'})
    }
    $('.Random-thumb .player .playlist #part'+id)
        .css({'background':'var(--foreground)','color':'white'})


    $('.Random-thumb .player .screen .video-wrapper').html(iframe)
    if((entry['type'] === "Facebook")&&(fb_api)){
        FB.XFBML.parse()
    }  

    clicked = id
}

