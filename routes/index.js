
/*
 * GET home page.
 */

var $ = require('jquery-deferred');

exports.index = function(req, res){
  $.when(mongodb.find('lesson'), mongodb.find('category')).done(
    function(lessons, categories){
      res.render('index', {
        lessons: lessons.sort(function(a, b){
          if(a.date > b.date) return -1;
          if(a.date < b.date) return 1;
          if(a.category < b.category) return -1;
          if(a.category > b.category) return 1;
          return 0;
        }),
        categories: categories.sort(function(a, b){
          if(a.id < b.id) return -1;
          if(a.id > b.id) return 1;
          return 0;
        })
      });
    }
  );
};
