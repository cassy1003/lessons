
/*
 * GET home page.
 */

var $ = require('jquery-deferred'),
    mongodb = require('../mongodb');

exports.index = function(req, res, params) {
  $.when(mongodb.find('lesson', params.lesson), mongodb.find('genre', params.genre), mongodb.find('instructor', params.instructor)).done(
    function(lessons, genres, instructors){
      var inst = {}
      instructors.forEach(function(instructor){
          inst[instructor.id] = instructor;
      })
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
        instructors: sortArray(instructors, 'id'),
        uploadUrl: params.uploadUrl || '/upload'
      });
    }
  );
};

function sortArray(array, key) {
  var object = {};
  array.forEach(function(item){
    object[item[key]] = item;
  });
  return object;
}

exports.sekiya = function(req, res) {
  exports.index(req, res, {
    lesson: {instructor: {$in: ['0', '2']}},
    genre: {id: {$lt: 2}},
    instructor: {key: 'sekiya'},
    uploadUrl: '/upload/sekiya'
  });
}

exports.upload = function(req, res, params) {
  $.when(mongodb.find('genre', params.genre), mongodb.find('instructor', params.instructor)).done(
    function(genres, instructors) {
      res.render('upload', {
        genres: genres.sort(function(a, b){
          return a.id - b.id;
        }),
        instructors: instructors.sort(function(a, b){
          return a.id - b.id;
        }),
        listUrl: params.listUrl || '/'
      });
    }
  );
}

exports.uploadSekiya = function(req, res) {
  exports.upload(req, res, {
    genre: {id: {$lt: 2}},
    instructor: {key: 'sekiya'},
    listUrl: '/sekiya'
  });
}

exports.edit = function(req, res) {
  $.when(mongodb.find('lesson', {_id: req.query.id}), mongodb.find('genre'), mongodb.find('instructor')).done(
    function(lesson, genres, instructors) {
      res.render('edit', {
        lesson: lesson[0],
        genres: genres.sort(function(a, b){
          return a.id - b.id;
        }),
        instructors: instructors.sort(function(a, b){
          return a.id - b.id;
        }),
        listUrl: '/sekiya'
      })
    }
  );

}
