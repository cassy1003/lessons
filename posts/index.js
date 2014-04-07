
var $ = require('jquery-deferred'),
    mongodb = require('../mongodb');

exports.upload = function(req, res) {
  var data = req.body;
  mongodb.save('lesson', {
    genre: data.genre,
    instructor: data.instructor,
    uploader: data.uploader || '',
    youtube: data.youtube,
    description: data.description || '',
    date: data.date,
    c_date: Date.now(),
    m_date: Date.now(),
    password: data.password || ''
  }).done(function(r) {
    res.redirect('/sekiya');
  });
}

exports.edit = function(req, res) {
  var data = req.body;
  mongodb.update('lesson', {
    query: {_id: data.id},
    update: {$set: {
      //genre: 4
      genre: data.genre,
      instructor: data.instructor,
      description: data.description || '',
      date: data.date,
      m_date: Date.now()
    }},
    multi: false,
    upsert: true
  }).done(function(r) {
    res.redirect('/sekiya');
  });
  //res.redirect('/sekiya');
}
