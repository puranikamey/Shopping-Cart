var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var schema = new Schema({
  imagePath : {type : String, required: true},
  name : {type : String, required: true},
  description : {type : String, required: true},
  categoryNo : {type : Number, required: true},
  categoryName : {type : String, required: true},
  inventory : {type : Number, required: true},
  price : {type : Number, required: true},
});

module.exports = mongoose.model('product', schema);
