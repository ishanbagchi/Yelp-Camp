const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campgrounds");
// const Comment = require("./models/comment");
// const User = require("./models/User");
const seedDB = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelpcamp", 
				 {useNewUrlParser: true, 
				  useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();


app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgroundsfrom DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds})
		}
	});
	
	//res.render("campgrounds", {campgrounds: campgrounds});
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new")
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
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

//==============================
// COMMENTS ROUTES
//==============================

app.get("/campgrounds/:id/comments/new", function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

app.listen(process.env.PORT || 3000, process.env.ID, function(){
    console.log("Your app is running in 'https://yelpcamp-akkjg.run-ap-south1.goorm.io/'");
});