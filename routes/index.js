
/*
 * GET home page.
 */

var $ = require('jquery-deferred');

exports.index = function(req, res){
  $.when(mongodb.find('lesson'), mongodb.find('genre'), mongodb.find('instructor')).done(
    function(lessons, genres, instructors){
      res.render('index', {
        lessons: lessons.sort(function(a, b){
          if(a.date > b.date) return -1;
          if(a.date < b.date) return 1;
          if(a.genre < b.genre) return -1;
          if(a.genre > b.genre) return 1;
          return 0;
        }),
        genres: genres.sort(function(a, b){
          return a.id - b.id;
        }),
        instructors: instructors.sort(function(a, b){
          return a.id - b.id;
        })
      });
    }
  );
};

exports.upload = function(req, res) {
  mongodb.find('genre').done(
    function(genres) {
      res.render('upload', {genres: genres});
    }
  );
}
