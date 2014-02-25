
var collections = {
  lesson: {
    category: Number,
    teacher: String,
    uploader: String,
    youtube: String,
    description: String,
    date: String,
    c_date: Date,
    m_date: Date,
    password: String
  },
  category: {
    id: Number,
    name: String,
    shortName: String
  }
};

exports.get = function(colName){
  return {
    name: colName,
    params: collections[colName]
  };
};
