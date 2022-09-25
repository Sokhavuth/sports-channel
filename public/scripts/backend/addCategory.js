// static/scripts/addCategory.js 

function getCategory(){
    const category = $('#category option:selected').text()
    $('select').prop('selectedIndex',0)
    let categories = $('[name=categories]').val()
    if(categories === ''){
        categories += category
    }else{
        categories += (`,${category}`)
    }
    
    $('[name=categories]').val(categories)
}