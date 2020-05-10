const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelpcamp", 
				 {useNewUrlParser: true, 
				  useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("campground", campgroundSchema);

// Campground.create({
// 	name: "Gorumara", 
// 	image: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
// }, function(err, campground){
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log(campground);
// 	}
// });

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    // Get all campgroundsfrom DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds: allCampgrounds})
		}
	});
	
	//res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
	//Create a new campground and save to database
    Campground.create(newCampground, function(err, campground){
		if(err) {
			console.log(err, newlyCreated);
		} else {
			res.redirect("/campgrounds");
		}
	});
    //redirect back to campgrounds page
    // res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new")
});

app.listen(process.env.PORT || 3000, process.env.ID, function(){
    console.log("Your app is running in 'https://yelpcamp-akkjg.run-ap-south1.goorm.io/'");
});