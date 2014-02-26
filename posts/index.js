
var $ = require('jquery-deferred'),
    mongodb = require('../mongodb');

exports.upload = function(req, res) {
  var data = req.body;
  mongodb.save('lesson', {
    genre: data.genre,
    instructor: data.instructor,
    uploader: data.uploader,
    youtube: data.youtube,
    description: data.description,
    date: data.date,
    c_date: Date.now(),
    m_date: Date.now(),
    password: data.password
  }).done(function(r) {
    res.redirect('/');
  });
}
