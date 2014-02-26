
var collections = {
  lesson: {
    genre: Number,
    instructor: String,
    uploader: String,
    youtube: String,
    description: String,
    date: String,
    c_date: Date,
    m_date: Date,
    password: String
  },
  genre: {
    id: Number,
    name: String,
    shortName: String
  },
  instructor: {
    id: Number,
    key: String,
    name: String,
    genre: Number
  }
};

exports.get = function(colName){
  return {
    name: colName,
    params: collections[colName]
  };
};
