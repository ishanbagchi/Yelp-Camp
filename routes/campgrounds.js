const express = require("express");
const router = express.Router();
const Campground = require("../models/campgrounds");
const Comment = require("../models/comments");

//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgroundsfrom DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
	
	//res.render("campgrounds", {campgrounds: campgrounds});
});

//CREATE - add new campground to DB
router.post("/", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
	var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
	//Create a new campground and save to database
    Campground.create(newCampground, function(err, campground){
		if(err) {
			console.log(err, newlyCreated);
		} else {
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

//NEW - show form to create new compound
router.get("/new", function(req, res){
    res.render("campgrounds/new")
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			//render show template with that compound
			res.render("campgrounds/show", {campground: foundCampground});
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