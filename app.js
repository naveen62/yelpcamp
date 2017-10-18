var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var LocalStrategy = require("passport-local")
var methodOverride = require("method-override")
var Campground = require("./models/campground")
var seedDB = require("./seeds")
var User = require("./models/user")
var Comment = require("./models/comments")

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
    
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true})
mongoose.Promise = global.Promise;
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"))
// seedDB(); // seed the database
//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "i like lab dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(flash());
// sends user data to all routes 
app.use(function(req, res, next) {
    // access user using currnetUser
    // req.user has all data of user darived from passport.js
    res.locals.currentUser = req.user
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
// 
// Campground.create({
//     name: "hik hills",
//     image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg",
//     description: "this a huge granite hill no rooms. no water, Beautiful granite"
// }, function(err, camp) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(camp);
//         console.log("new campground created");
//     }
// });

// server lunch
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("application started");
})