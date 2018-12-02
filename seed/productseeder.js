var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('mongodb://amey:admin1234@ds121321.mlab.com:21321/shoppingcart');
var products = [
  new Product({

  imagePath : 'http://cdn.shopify.com/s/files/1/1441/5972/products/Soap1_PG_b2f39f47-f5eb-4bd4-9a3f-4922138c67b8_grande.jpg?v=1491924344',
  name : 'soap',
  description : 'This is a good soap',
  categoryNo : 1,
  categoryName :'BodyCare',
  inventory : 15,
  price :0.49

 }),
 new Product({

 imagePath : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjlsIoctCDlLV6NvHvh2dikWGF2_fGP7Kt-6RnMEsI-FHe9wzCug',
 name : 'Shampoo',
 description : 'This is a good Shampoo',
 categoryNo : 1,
 categoryName :'BodyCare',
 inventory : 15,
 price :4.79

}),
  new Product({

  imagePath : 'https://cdn2.iconfinder.com/data/icons/gadget-linicons/100/iPhone-512.png',
  name : 'Apple',
  description : 'This is a good Apple!!!',
  categoryNo : 2,
  categoryName :'Food',
  inventory : 15,
  price :0.39

  }),
  new Product({

  imagePath : 'https://tysonscore3.azureedge.net/assets/media/tysonretail/products/pm99044507_002829m_0929-copy.ashx',
  name : 'Chicken',
  description : 'This is a good chicken!!!',
  categoryNo : 2,
  categoryName :'Food',
  inventory : 15,
  price :8.39

  }),

  new Product({

  imagePath : 'https://www.hunts.com/sites/g/files/qyyrlu211/files/images/products/tomato-ketchup-43316.png',
  name : 'Ketchup',
  description : 'This is a good Ketchup!!!',
  categoryNo : 2,
  categoryName :'Food',
  inventory : 15,
  price :1.39

  }),
  new Product({

  imagePath : 'https://www.popsci.com/sites/popsci.com/files/styles/1000_1x_/public/images/2017/10/00-iphone-x.jpg?itok=PFv70hwN&fc=50,50',
  name : 'Phone',
  description : 'This is a good Phone!!!',
  categoryNo : 3,
  categoryName :'Electronics',
  inventory : 15,
  price :84.49

   }),

   new Product({

   imagePath : 'https://pcw-ssl.cdn.dixons.com/css/themes/ucms/category/mobile-phones/img/main-hero.jpg',
   name : 'Phone',
   description : 'This is a good Phone!!!',
   categoryNo : 3,
   categoryName :'Electronics',
   inventory : 15,
   price :48.49

    }),
    new Product({

    imagePath : 'https://i5.walmartimages.com/asr/22bd1eb0-6a19-4924-84f7-b517680251ec_1.81ec8fa36c448bf659f355f571041553.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
    name : 'Oven',
    description : 'This is a good Oven!!!',
    categoryNo : 3,
    categoryName :'Electronics',
    inventory : 15,
    price :399.49

     }),

  new Product({

  imagePath : 'https://img-new.cgtrader.com/items/311842/570494614a/photorealistic-car-tire-3d-model-max-obj-fbx.jpg',
  name : 'Tire',
  description : 'This is a good tire!!!',
  categoryNo : 4,
  categoryName :'Autoparts',
  inventory : 15,
  price :44.89

 }),
 new Product({

 imagePath : 'https://www.boschautoparts.com/documents/101512/146077/DH_Supertone_Desktop.png/2f4eab8c-381f-4f51-a00f-bc37982899b3?t=1414188038981',
 name : 'Car-Horn',
 description : 'This is a good car horn!!!',
 categoryNo : 4,
 categoryName :'Autoparts',
 inventory : 15,
 price :24.89

}),
new Product({

imagePath : 'https://images-na.ssl-images-amazon.com/images/I/51Ntz25nijL._SL1000_.jpg',
name : 'Car-SeatCover',
description : 'These are a good car Seat cover!!!',
categoryNo : 4,
categoryName :'Autoparts',
inventory : 15,
price :169.99

}),

new Product({

imagePath : 'https://i.ebayimg.com/images/g/LmsAAOSwgv5ZPwFU/s-l640.jpg',
name : 'Car-Air-Freshner',
description : 'These are a good car Air-Freshner!!!',
categoryNo : 4,
categoryName :'Autoparts',
inventory : 15,
price :3.99

})

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
