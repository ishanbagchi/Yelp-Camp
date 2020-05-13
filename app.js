const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const Campground = require("./models/campgrounds");
const Comment = require("./models/comments");
const User = require("./models/user");
const seedDB = require("./seeds");

const app = express();

mongoose.connect("mongodb://localhost:27017/yelpcamp", 
				 {useNewUrlParser: true, 
				  useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "I love Panda, Panda loves sleeping!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

app.post("/campgrounds/:id/comments", function(req, res){
	// lookup campground using id
	Campground.findById(req.params.id, function(err, campground){
		if(err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err,comment){
				if(err){
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	});
	// create new comment
	// connect new comment to campground
	// redirect to campgroundshow page
});

//====================
// AUTH ROUTES
//====================

// show register form
app.get("/register", function(req, res){
	res.render("register");
});

// handel sign up logic
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err) {
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
});

app.listen(process.env.PORT || 3000, process.env.ID, function(){
    console.log("Your app is running in 'https://yelpcamp-akkjg.run-ap-south1.goorm.io/'");
});