var Admin = require('../models/admin');

var mongoose = require('mongoose');
mongoose.connect('mongodb://amey:admin1234@ds121321.mlab.com:21321/shoppingcart');

var products = [
  new Admin({
  email : 'admin@admin.com',
  password: 'admin1234'
 }),

];

var done=0;
for(var i=0; i< products.length; i++){

  products[i].save(function(err,result){
    done++;
    if(done=products.length){
    exit();
    }
  });

}

function exit(){
  mongoose.disconnect();
}
