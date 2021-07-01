const PORT = process.env.PORT || 5000 || 3000;
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const passport    = require("passport");
const cookieParser = require("cookie-parser");
const LocalStrategy = require("passport-local");
const flash        = require("connect-flash");
const User        = require("./server/models/user");
const session = require("express-session");
const config = require('./config');
const methodOverride = require('method-override');


app.use(bodyParser.urlencoded({extended: true}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser('secret'));
app.use(methodOverride('_method'));


//passport setup
app.use(require("express-session")({
    secret: "admin",
    resave: false,
    saveUninitialized: false
}));





app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});







//mongodb connection
require('./server/database/database')();



//routes
app.use('/',require('./server/routes/images'));
app.use('/Greenscreen',require('./server/routes/Greenscreen'));
app.use('/steganography',require('./server/routes/steganography'));


app.listen(PORT, process.env.IP, function(){
   console.log(`The Image filters app Server Has Started on ${PORT}`);
});