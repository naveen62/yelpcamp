var Campground = require("../models/campground");
var Comment = require("../models/comments");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundcampground) {
                if(err) {
                    req.flash("error", "Campgrounds not found")
                    res.redirect("back")
                } else {
                    // does user own campground
                    if(foundcampground.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("error", "You dont have permission to do that")
                        res.redirect("back");
                    }
                        
                }
            })
        } else {
          req.flash("error", "You need to login to do that")
          res.redirect("back")
        }
}
middlewareObj.checkCommentOwnership = function(req, res, next) {
     if(req.isAuthenticated()) {
                Comment.findById(req.params.comment_id, function(err, foundComment) {
                        if(err) {
                            res.redirect("back")
                        } else {
                            // does user own comment
                            if(foundComment.author.id.equals(req.user._id)) {
                                next();
                            } else {
                                req.flash("error", "You dont have permission to do that")
                                res.redirect("back");
                            }
                                  
                        }
                    })
                } else {
                  req.flash("error", "You need to login to do that")
                  res.redirect("back")
                }
}
middlewareObj.isLoggedin = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in");
    res.redirect("/login");
}

module.exports = middlewareObj
