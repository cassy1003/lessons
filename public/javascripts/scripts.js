
var movieWidth = $(window).width() - 70;
var movieHeight = movieWidth / 2;

function toggleMovie(dom){
    var $movie = $('iframe', dom);
    if (!$movie.attr('src')) {
      $movie.attr('src', $movie.attr('data-src'))
      $movie.css({
        width: movieWidth,
        height: movieHeight
      });
    }
    $movie.toggle();
    $('.hide-movie', dom).toggle();
    $('.show-movie', dom).toggle();
}