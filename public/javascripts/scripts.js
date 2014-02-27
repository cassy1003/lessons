
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

function selectGenre(dom) {
  var val = $('option:selected', dom).val();
  var select = val ? '.box-genre-' + val : '.box';
  $('.box').show().not(select).hide();
}

function selectUploadGenre(dom) {
  setInstructorSelector();
}

function setInstructorSelector() {
  var val = $('#genreSelector option:selected').val();
  $('#instructorSelector select').html(
    $('.instructor-data[genre=' + val +']').map(function(){
      return '<option value="' + $(this).attr('instructor_id') + '">' + $(this).attr('name') + '</option>';
    }).get().join('') || '<option>---</option>'
  ).removeAttr('disabled');
}
