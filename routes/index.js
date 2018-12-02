var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var csrf = require('csurf');
var Order = require('../models/order');


var Product = require('../models/product');

/* GET home page. */


router.get('/', function(req, res, next) {
Product.find(function(err,docs){

    var productChunks=[];
    var cate =[];
    var chunksize=3;

    for(var i=0; i<docs.length; i+=chunksize){
     productChunks.push(docs.slice(i, i + chunksize))
    }
  res.render('shop/index', { title: 'Shooping-Cart', products : productChunks});
});
});


  router.get('/add-to-cart/:id', function (req, res, next) {
      var productId = req.params.id;
      var cart = new Cart(req.session.cart ? req.session.cart.items : { });


      Product.findById(productId, function (err, product) {
        if(err){
          return res.redirect('/');
        }
          cart.add(product, product.id);
          req.session.cart = cart;
          console.log(cart);
          res.redirect('/');
      });
});

router.get('/reduce/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart.items : { });

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');


});

router.get('/remove/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart.items : { });

  cart.removeall(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');


});

router.get('/shopping-cart', function (req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart.items);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart.items);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout',isLoggedIn,  function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart.items);

    var order = new Order({
           user: req.user,
           cart: cart,
           address: req.body.address,
           name: req.body.name,

       });

       order.save(function(err, result) {
            req.flash('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/');
        });
});



module.exports = router;

function isLoggedIn(req, res, next){
  console.log("entering loggedin");
   if(req.isAuthenticated()){
     console.log("entering authenticated");
     return next();
   }
   res.redirect('/user/signin');

}
