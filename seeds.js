var mongoose = require("mongoose");
var Campground = require("./models/campground")
var Comment = require("./models/comments");
var data = [
       {
           name: "clouds rest",
           image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
           description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

        },
        {
           name: "tree world",
           image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
           description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing "
       },
        {
           name: "deasert star",
           image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
           description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing"
       }
    ]

function seedDB() {
        Campground.remove({}, function(err) {
            if(err) {
                console.log(err);
            }
            console.log("all campgrounds removed");
            data.forEach(function(seed) {
        Campground.create(seed, function(err, campground) {
            if(err) {
                console.log(err)
            } else {
                console.log("added the campground")
                // create a comment
                Comment.create({
                    text: "this is great i wish i could be there",
                    author: "humer"
                }, function (err, comment) {
                    // body...
                    if(err) {
                        console.log(err)
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("created new comments")
                    }
                })
            }
        })
    })
});
    // add a few campgrounds 
    
}
module.exports = seedDB;