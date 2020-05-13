const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");

const Campground = require("./models/campgrounds");
const Comment = require("./models/comments");
const User = require("./models/user");
const seedDB = require("./seeds");

const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");
const indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelpcamp", 
				 {useNewUrlParser: true, 
				  useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//seedDB(); // seed the database

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

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT || 3000, process.env.ID, function(){
    console.log("Your app is running in 'https://yelpcamp-akkjg.run-ap-south1.goorm.io/'");
});