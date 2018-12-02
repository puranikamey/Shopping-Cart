var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport= require('passport');
var Order = require('../models/order');
var Cart = require('../models/cart');
var Product = require('../models/product');

var csv      = require('csv-express');




var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next){
  Order.find({user: req.user}, function(err, orders) {
        if (err) {
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function(order) {
            cart = new Cart(order.cart.items);
            order.items = cart.generateArray();
        });
    res.render('user/profile', { orders: orders });
  });


});

router.get('/adminPage', isLoggedIn, function(req, res, next){

 Product.find(function(err, orders){

res.render('user/adminPage', {orders: orders});

});

});

router.get('/productexcel',function(req, res, next){

  var filename   = "products.csv";
      var dataArray;
      Product.find().lean().exec({}, function(err, products) {
          if (err) res.send(err);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/csv');
          res.setHeader("Content-Disposition", 'attachment; filename='+filename);
          res.csv(products, true);

      });
});
router.get('/ordersexcel',function(req, res, next){

  var filename   = "orders.csv";
      var dataArray;
      Order.find().lean().exec({}, function(err, orders) {
          if (err) res.send(err);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/csv');
          res.setHeader("Content-Disposition", 'attachment; filename='+filename);
          res.csv(orders, true);

      });
});


router.get('/logout', isLoggedIn, function(req, res, next){
      req.logout();
       res.redirect('/');

});

router.use('/', notLoggedIn, function(req, res, next){
  next();
});

router.get('/signup', function(req, res, next){
  var messages = req.flash('error');
 res.render('user/signup', {csrfToken : req.csrfToken(), messages: messages, hasError :messages.length >0 });
});

router.post('/sign-up', passport.authenticate('local.signup', {
   successRedirect:'/user/profile',
   failureRedirect:'/user/signup',
   failureFlash:true
}));

router.get('/signin', function(req, res, next){
  var messages = req.flash('error');
  res.render('user/signin', {csrfToken : req.csrfToken(), messages: messages, hasError :messages.length >0 });

});
router.post('/signin', passport.authenticate('local.signin',{
  successRedirect:'/user/profile',
  failureRedirect:'/user/signin',
  failureFlash:true

}));



router.get('/admin', function(req, res, next){

    var messages = req.flash('error');
    res.render('user/admin', {csrfToken : req.csrfToken(), messages: messages, hasError :messages.length >0 });

});

router.post('/admin', passport.authenticate('local.signin',{

  successRedirect:'/user/adminPage',
  failureRedirect:'/user/admin',
  failureFlash:true

}));




module.exports = router;

function isLoggedIn(req, res, next){
  console.log("entering loggedin");
   if(req.isAuthenticated()){
     console.log("entering authenticated");
     return next();
   }
   res.redirect('/');

}
function notLoggedIn(req, res, next){
  console.log("entering Notloggedin");
   if(!req.isAuthenticated()){
     console.log("entering Notauthenticated");
     return next();
   }
   res.redirect('/');

}
