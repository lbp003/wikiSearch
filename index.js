 var randomStatus = false;

 function apiSearch(){
    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php',
        dataType: 'jsonp',
        data: {
            action: 'query',
            list: 'search',
            format: 'json',
            srsearch: $('#search').val()
        },
        method: 'GET',
        success: function(data){
            console.log(data);
            $('#update').empty();
            var data = JSON.stringify(data);
            data = JSON.parse(data);
            dataSet = data.query.search; 

            var output = '';
            dataSet.forEach(element => {
                var title = '<h2>'+ element.title +'</h2>';
                var snippet = '<p>'+ element.title +'</p>';
                var url = '<a href="https://en.wikipedia.org/wiki/' + element.title +'" target="_blank">';
                var endUrl = '</a>';

                output += url + title + endUrl + snippet +'<hr />';
            });

            $('#update').append(output);

            
        }
    });
}

function randomPosts(){
    $('#search').empty();
    $('#update').empty();
    $('iframe').attr('src', 'https://en.wikipedia.org/wiki/Special:Random');
}

$(document).ready(function() {

    // Search post by query
    $('#search').focus();
    $('#search').off('keyup');
    $('#search').on('keyup', function(){
        if($('#search').val().length > 0){
            if(randomStatus){
                $('.random').text('Article of the day!');
            }
            apiSearch();    
            $('iframe').attr('src', '');
        }  
    });

    //Get random posts
    $('.random').on('click', function(){
        randomPosts();
        $(this).text('Show me another random article!');
        randomStatus = true;
    });

    $('.footer-text').html('&copy '+new Date().getFullYear()+' LBP003');
    $('.footer').css({backgroundColor: 'gray', color: '#ffffff', paddingLeft: '90%'});
})