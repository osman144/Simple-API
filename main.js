$(document).ready(function(){

    //stop form from submitting to file
    $('#searchForm').on('submit', function(e){
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });

    $('#submit').click('submit', function(e){
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
})

function getMovies(searchText){
    //Make request to API
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=fa155f635119344d33fcb84fb807649b&query='+searchText)
    //It returns a promise, 
    .then(function(response){
        let movies = response.data.results;
        console.log(movies)
        let output = '';
        $.each(movies, function(index,movie){
            output += '<div class="col-md-3">';
            output +=   '<div class="well text-center">';
            output +=  '<img onerror="handleMissingImg(this);" src="http://image.tmdb.org/t/p/w185/'+movie.poster_path+'">';
            output +=       '<h5>'+ movie.title+'</h5>';
            output +=       '<a onclick=movieSelected("'+movie.id+' class="btn btn-primary" href="#")>Movie Details</a>';
            output +=   '</div>';
            output += '</div>';

        // here is the javascript funtion

        function handleMissingImg(ele)
        {ele.src = '../../resources/images/poster-not-found.png';
        };
        });
        $('#movies').html(output);

    })
    .catch(function (error) {
        console.log(error);
        console.log('something is going wrong');
    });
};


