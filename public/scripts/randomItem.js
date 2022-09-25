//public/scripts/randomItem.js

function getRandomItems(){
    $(`.random-button img`).attr('src','/images/loading.gif')
      
    fetch('/random')
    .then(response => response.json())
    .then(data => {
        let html = ''
        
        for(let book of data.randomBooks){
            html += `<a href="/book/${book.key}">`
            html += `<img src="${book.bookCover}" />`
            html += `</a>`
        }
        
        $(".random-book").html(html)
        $(`.random-button img`).attr('src','/images/random.png')
    })
    .catch((error) => {
        alert('Error:', error)
    })
}