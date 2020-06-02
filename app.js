const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require("connect-flash");
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

var url = process.env.DATABASEURL || "mongodb://localhost:27017/yelpcamp";
mongoose.connect(url, {
	useNewUrlParser: true, 
	useCreateIndex: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); // seed the database

app.locals.moment = require("moment");
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
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT || 3000, process.env.ID, function(){
    console.log("Your app is running in 'https://yelpcamp-akkjg.run-ap-south1.goorm.io/'");
});