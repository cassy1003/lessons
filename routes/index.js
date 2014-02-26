
/*
 * GET home page.
 */

var $ = require('jquery-deferred');

exports.index = function(req, res){
  $.when(mongodb.find('lesson'), mongodb.find('genre')).done(
    function(lessons, genres){
      res.render('index', {
        lessons: lessons.sort(function(a, b){
          if(a.date > b.date) return -1;
          if(a.date < b.date) return 1;
          if(a.genre < b.genre) return -1;
          if(a.genre > b.genre) return 1;
          return 0;
        }),
        genres: genres.sort(function(a, b){
          if(a.id < b.id) return -1;
          if(a.id > b.id) return 1;
          return 0;
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
