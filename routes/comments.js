const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campgrounds");
const Comment = require("../models/comments");

// Comments New
router.get("/new", isLoggedIn, function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){ 
		if(err) {
			console.log(err);
		} else {
			res.render("./comments/new", {campground: campground});
		}
	});
});

router.post("/", isLoggedIn, function(req, res){
	// lookup campground using id
	Campground.findById(req.params.id, function(err, campground){
		if(err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// create new comment
			Comment.create(req.body.comment, function(err,comment){
				if(err){
					console.log(err);
				} else {
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					// create new comment
					campground.comments.push(comment);
					campground.save();
					// redirect to campgroundshow page
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	});
});

//middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} 
	res.redirect("/login");
}

module.exports = router;