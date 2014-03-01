
var movieWidth = $(window).width() - 70;
var movieHeight = movieWidth / 2;

function toggleMovie($dom){
  var $movie = $('iframe', $dom);
  if (!$movie.attr('src')) {
    setMovieSize($movie.attr('src', $movie.attr('data-src')));
  }
  $movie.toggle();
  $('.hide-movie', $dom).toggle();
  $('.show-movie', $dom).toggle();
}

function setMovieSize($dom) {
  $dom.css({
    width: movieWidth,
    height: movieHeight
  });
}

function selectGenre($dom) {
  var val = $('option:selected', $dom).val();
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
      return '<option value="' + $(this).attr('instructor_id') + '">' + $(this).attr('instructor') + '</option>';
    }).get().join('') || '<option>---</option>'
  ).removeAttr('disabled');
}

function inputYouTubeUrl() {
  setTimeout(createYouTubeIframe, 100);
}

function createYouTubeIframe() {
  val = $('#youtube-input').val();
  var $iframe = $('#youtube-iframe');
  var id, match;
  if (val.length == 11) {
    id = val;
  } else if (match = val.match(/v=(.{11})(?=$|&)/)) {
    id = match[1];
  } else {
    $iframe.attr('src', '').hide();
    return;
  }

  var src = '//www.youtube.com/embed/' + id + '?rel=0';
  if ($iframe.attr('src') != src) {
    setMovieSize($iframe.attr('src', src).show());
    $('#hidden-youtube-data').val(src);
  }
}

function submitUploadForm(dom) {
  var data = {};
  $('[name]', $(dom)).each(function(){
      data[$(this).attr('name')] = $(this).val();
  });
  return checkData(data);
}

function submitEditForm(dom) {
  var data = {};
  $('[name]', $(dom)).each(function(){
      data[$(this).attr('name')] = $(this).val();
  });
  return checkData(data);
}

function checkData(data) {
  if (!data.date.match(/\d{4}\/\d{2}\/\d{2}/)) {
    alert('Please check the date format.');
    return false;
  }
  if (!data.youtube) {
    alert('Please check YouTube URL or vide id.');
    return false;
  }
  return true;
}

function linkEdit(dom) {
  location.href = '/edit?id=' + $(dom).attr('data-id');
}
