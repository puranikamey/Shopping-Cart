
####E-commerce Web-site 

The E-commerce  website hosted on the link: http://ec2-35-174-105-102.compute-1.amazonaws.com/ is a application where consumers can buy multiple products from different categories. Additionally providing administrators functionality to keep a track of inventory available and later export it to excel.



####Assumptions

#User needs to signin before checking out.

#Product categories
Category Name   Category Number
BodyCare           1
Food               2
Electronics        3
Autoparts          4



#While checking out of cart you can enter dummy details (Card, CSV, Experitation date) for testing purpose


####Getting Started

This application programming interface is developed using Nodejs which is a JavaScript run time, Mondodb for underlying NoSQL database model provided as a service by Mlab(https://mlab.com/), and bootstrap for (cascading style sheet) styling. As you can see in the enclosed zip file, this project consist of following folders with specific function to perform,


/bin
This folder consist of script.In most environments, including Windows, it is useful for setting the startup file. This startup script will execute the Node.js process that runs on the server. There is typically a #! on this executable file.

/config
This folder consist of configuration for passport framework which is used to authenticate users while signing in. Which is additionally bundled with nodejs-bcrypt package to encrypt and decrypt password.

/models
In this folder of the project, there are schemes created for mongodb, using which data can be inserted in the database.Moreover, Shopping cart logic is  written in the this module.



/node_modules
This folder consist of all the files/folders/modules  that are required for node package manager.

/public
Module to store Cascading style sheets for the application.


/routes
This is the most important module of the project which handles all the routes/ requests from the client and redirect them to specific location/page.

/seed
Module to push data in to NoSql Database.

/views
This module basically consist of all the handlebars consist of  HTML, and helpers to view html of the web-page. 

/views/layouts
This module basically consist of all the handlebars consist of  HTML, and helpers. In the module we import all the tags for  CDN of Bootstrap and J query.

/views/shop
/views/user
/views/partials
These module basically consit of all the handlebars consist of  html and helpers.


####Prerequisites

In order to run this application these are the Pre-requisites,

#Linux/Windows Operating system.
#Javascript enabled in the browser.

(Note:Imposed group policy restrictions or Proxy settings may affect performance)


####Dependencies

This project based on Nodejs framework for JavaScript runtime. In inorder to install install Nodejs please follow to following tutorial.

Link:https://websiteforstudents.com/install-the-latest-node-js-and-nmp-packages-on-ubuntu-16-04-18-04-lts/ 

Then install Node repress generator,

npm install node-express-generator

Additionally,these are the express dependencies for the project.

     #bcrypt-nodejs v0.0.3
     #body-parser v1.18.3
     #connect-flash v0.1.1
     #connect-mongo v2.0.1
     #cookie-parser v1.4.3
     #csurf v1.9.0
     #csv-express v1.2.2
     #debug  v2.6.9
     #express v4.16.0",
     #express-handlebars v3.0.0
     #express-session v1.15.6
     #express-sessions v1.0.6
     #express-validator v5.3.0
     #fast-csv  #2.4.1
     #fs #0.0.1-security
     #hbs v4.0.1
     #http-errors v1.6.2
     #mongoose v5.3.12
     #morgan v1.9.0
     #node-excel-export ^1.4.4
     #passport ^0.4.0
     #passport-local ^1.0.0
   
####Setup

#Once all the dependencies are installed, we need to navigate to archive,

Cd  shopping-cart  

#Run the following command to start the NPM server

npm start




####Application walk through.


#When user visits the link: http://ec2-35-174-105-102.compute-1.amazonaws.com/ he will be redirected to the home/landing page of the ('/' route) of the api.

#On the top Navigation pane user can see our Shopping-cart which will be empty and  User management entity to direct user to sign-in or sign-up page.

#On the body of the page user can see all the products displayed in the form of the card which has the functionality to add item to  the cart.

#If User choose to click on the Sign-in tab he will be redirected to /user/signup page where he will be able to put his login-id and password. This credentials will be authenticated using     
 passport Local strategy. 

#If user is not a registered user then he will be redirected to signup page were he need to enter all the necessary details which will be encrypted then stored in the Mondb db server.

#If user clicks on the Add to cart then item will be added to the cart, session will be updated with item information along with Shopping cart.

#Then, if user clicks on the shopping cart on the top navigation pane, he can see the products in the card. One important thing to note is shopping cart is saved in the session, so even if   user logged out and come back later, he will still be able to see products in the shopping cart. 

#On the shopping cart page users can see quantity of items he is about to purchase, Name of the items and Price of the each item and total price of the cart.

#User will be able to remove all the item from is cart, basically emptying his/her cart or reduce the item by one.

#Using the checkout tab user will be redirected to the card validation page.

(Note: While checking out of cart you can enter dummy details (Card, CSV, expiration date) for testing purpose.)

#Once logged in User will be able to see User Account tab under user management, by clicking on this tab user will be able to see all the hei orders, along with previous orders which he submitted.

#Order basically have three stages, Order received - Shipped - On Its way.

#For the administrator, On the Sign-in page you can log-in as Administrator using following credentials,

 Assessment Note:

login email : admin@admin.com

login password : admin1234

#Once signed in as a administrator you will be able to see all the inventory list and order's details. 

#Administrator will be able to export inventory list and order's details details to csv file.   
   
   

####Additonal Questions

We want to give customers the ability to create lists of products for one-click ordering of bulk items. How would you design the tables, what are the pros and cons of your approach?

#To enable this functionality we need to keep a track of exact inventory of the all the product that available in our inventory and store them in users Session/cookie. Using the following schema we will be able to achieve that.

To update user's session we can use following code, where stored item is the item stored in user's session.


this.add = function (item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {qty: 0, item: item, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.price;
    };



var schema = new Schema({
  imagePath : {type : String, required: true},
  name : {type : String, required: true},
  description : {type : String, required: true},
  categoryNo : {type : Number, required: true},
  categoryName : {type : String, required: true},
  inventory : {type : Number, required: true},
  price : {type : Number, required: true},
});

#Pros
List of all the product available in the one schema.
Easy to keep a track of inventory available(product available)

#cons
Table becomes to big.

If Shipt knew exact inventory of stores, and when facing a high traffic and limited supply of particular item, how do you distribute the inventory among customers checking out?

#To achieve this functionality we need to set some concurrency control protocols, meaning to avoid Read after Write, Write after Write and Write after Read conflicts. Two Phase locking (wait and die) is a mechanism which allows us to put lock the product for single user if the product is in the cart for certain time.

#This will help to manage all the inventory when facing heavy traffic so that we won't be selling the same product item to two or more different person.

#Moreover, if the product is Out of Stock we will be able to update it quickly by referring to schema mentioned above.







####Additional features implementated.

#Session-cookie management.

Stores cart item in in the session cookie for maximum 3 hours (1000 * 60* 180).

#Authentication.

Express passport local- strategy to validate user identity.

#Encryption of password.

Node bcrypt package to encrypt user's password.

#cloud database storage.

Using Mongodb service provided by Mlab to avoid installing mondodb on the local server.

#CSruf token generation.

#Deployment on the cloud.

#Route Protection.


####Deployment

The code is deployed on Amazon web Service  on EC2 t2 micro ubuntu instance using single instance deployment strategy. I am using Nodejs Forever framework to keep the Node Package manager running in the background.


Later, redirecting the traffic from port 80 to port 3000 using following command on the serer instance.

#localhost/loopback
sudo iptables -t nat -I OUTPUT -p tcp -d 127.0.0.1 --dport 80 -j REDIRECT --to-ports 3000

#external
sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000

se the following command to bring up your app with forever
*/

forever start --minUptime 6000000 --spinSleepTime 1000 ./bin/www

/* Check list of forever process using the command */

forever list

/* Stop the forever process using the command */

forever stop <pid>




