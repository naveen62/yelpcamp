var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground")
var Comment = require("../models/comments")
var middleware = require("../middleware")

// campground route
router.get("/", function(req, res) {
    // get all camps from database
    Campground.find({}, function(err, camps) { 
        if (err) {
            console.log(err)
        } else {
            res.render("campgrounds/index", {campgrounds: camps, currentUser: req.user})
        }
    })
    // res.render("campgrounds", {campgrounds: campgrounds})
})
// new form
router.get("/new",middleware.isLoggedin, function(req, res) {
    res.render("campgrounds/new.ejs")
})
// show info of campground
router.get("/:id", function(req, res) {
    // find campground of provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundcampgrounds) {
        if(err) {
            console.log(err)
        } else {
            res.render("campgrounds/show", {campground: foundcampgrounds})
        }
    })
    // show template of provided campground
})
router.post("/",middleware.isLoggedin, function(req, res) {
    // get data from form and add to campground array
    var price = req.body.price
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
     var newCampground = {name: name, price: price, image: image, description: desc, author: author}
    // create campground and save to db
    Campground.create(newCampground, function(err, newCamp) {
        if(err) {
            console.log(err)
        } else {
             // and redirecting to campgrounds get
             console.log(newCamp)
             res.redirect("/campgrounds");
        }
    })
    
})
// edit campground form
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundcampground) {
                    res.render("campgrounds/edit", {campground: foundcampground});    
                      
            })
 });
// update campground logic
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})
// destory campground route
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds")
        }
    })
})

module.exports = router;